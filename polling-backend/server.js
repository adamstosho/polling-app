require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const pollRoutes = require('./routes/poll');
const userRoutes = require('./routes/user');
const Poll = require('./models/Poll');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const jwt = require('jsonwebtoken');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: [
            'http://localhost:3000',
        ],
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
    origin: [
        'https://polling-app-srjt.vercel.app',
        "https://polling-app-sand.vercel.app",
        
    ],
    credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());

// Swagger Setup
const swaggerOptions = {
    definition: require('./config/swagger.json'),
    apis: ['./routes/*.js'], // Scan route files for potential JSDoc
};

if (process.env.NODE_ENV === 'production') {
    swaggerOptions.definition.servers = [
        {
            url: 'https://polling-app-4ke0.onrender.com/api',
            description: 'Deployed Server',
        },
    ];
} else {
    swaggerOptions.definition.servers = [
        {
            url: `http://localhost:${process.env.PORT || 5000}/api`,
            description: 'Local Development Server',
        },
    ];
}

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/polls', pollRoutes);
app.use('/api/users', userRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Socket.io authentication middleware
io.use((socket, next) => {
    const token = socket.handshake.query.token;
    if (!token) {
        return next(new Error('Authentication error: No token provided.'));
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = decoded;
        next();
    } catch (err) {
        return next(new Error('Authentication error: Invalid token.'));
    }
});

// Socket.io connection
io.on('connection', (socket) => {
    socket.on('join-poll', (pollId) => {
        socket.join(`poll-${pollId}`);
    });
    socket.on('leave-poll', (pollId) => {
        socket.leave(`poll-${pollId}`);
    });
});

// Patch vote endpoint to emit real-time updates
const pollRouter = require('express').Router();
pollRouter.post('/:id/vote', async (req, res, next) => {
    try {
        const { option } = req.body;
        const poll = await Poll.findById(req.params.id);
        if (!poll) return res.status(404).json({ message: 'Poll not found.' });
        if (poll.expiresAt && new Date() > poll.expiresAt) {
            return res.status(400).json({ message: 'Poll has expired.' });
        }
        const opt = poll.options.find(o => o.text === option);
        if (!opt) return res.status(400).json({ message: 'Option not found.' });
        opt.votes += 1;
        await poll.save();
        io.to(`poll-${poll._id}`).emit(`poll-${poll._id}-updated`, poll.options);
        return res.status(200).json({ message: 'Vote recorded.', poll });
    } catch (err) {
        return res.status(500).json({ message: 'Server error.' });
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found.' });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});