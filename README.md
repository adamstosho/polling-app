# PollFlow - Real-Time Polling Application

A modern, full-stack polling application built with Next.js, Node.js, and real-time capabilities. Create, share, and vote on polls with live results and beautiful analytics.

## 🚀 Features

- **Real-time Voting**: Watch votes come in live with instant updates across all devices
- **Beautiful Analytics**: Visualize results with interactive charts and detailed breakdowns
- **Easy Sharing**: Share polls instantly with QR codes, direct links, and social media integration
- **Global Reach**: Multi-language support and timezone handling
- **Secure & Private**: Enterprise-grade security with encrypted data and privacy-first approach
- **Time Controls**: Set expiry dates, schedule polls, and control voting windows
- **Mobile Responsive**: Works seamlessly on all devices
- **User Authentication**: Secure signup/signin with JWT tokens
- **Live Charts**: Real-time data visualization with Chart.js
- **QR Code Generation**: Easy sharing with QR codes

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Radix UI** - Accessible component primitives
- **React Hook Form** - Form handling and validation
- **Zod** - Schema validation
- **Chart.js** - Data visualization
- **Socket.io Client** - Real-time communication
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Socket.io** - Real-time bidirectional communication
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Swagger** - API documentation
- **Rate Limiting** - Request throttling

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- MongoDB (local or cloud)
- npm or yarn

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd polling-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pollflow
JWT_SECRET=your_jwt_secret_here
JWT_REFRESH_SECRET=your_refresh_secret_here
```

4. Start the development server:
```bash
npm run dev
```

The backend will be available at `http://localhost:5000`

## 🚀 Usage

### Creating a Poll
1. Sign up or sign in to your account
2. Navigate to "Create Poll"
3. Enter your question and options
4. Set an optional expiry date
5. Click "Create Poll"

### Voting
1. Open a poll link
2. Select your preferred option
3. Click "Vote"
4. Watch real-time results update

### Sharing
- Copy the direct link
- Scan the QR code
- Share on social media

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/signin` - Login user
- `POST /api/auth/refresh` - Refresh JWT token

### Poll Endpoints
- `POST /api/polls` - Create a new poll
- `GET /api/polls` - Get all polls (paginated)
- `GET /api/polls/:id` - Get single poll
- `POST /api/polls/:id/vote` - Vote on a poll
- `GET /api/polls/:id/results` - Get poll results

### User Endpoints
- `GET /api/users/me` - Get current user
- `GET /api/users/me/polls` - Get user's polls

For detailed API documentation, see [API_DOCUMENTATION.md](polling-backend/API_DOCUMENTATION.md)

## 🔧 Development

### Project Structure
```
polling_app/
├── frontend/                 # Next.js frontend
│   ├── app/                 # App router pages
│   ├── components/          # React components
│   ├── contexts/           # React contexts
│   ├── hooks/              # Custom hooks
│   └── lib/                # Utilities and API
└── polling-backend/         # Node.js backend
    ├── controllers/         # Route controllers
    ├── models/             # MongoDB models
    ├── routes/             # API routes
    ├── middleware/         # Custom middleware
    └── config/             # Configuration files
```

### Available Scripts

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

**Backend:**
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting on sensitive endpoints
- CORS protection
- Input validation and sanitization
- Secure HTTP headers

## 📊 Real-time Features

- Live vote updates via Socket.io
- Real-time chart updates
- Instant notification system
- Cross-device synchronization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Socket.io](https://socket.io/) for real-time capabilities
- [Chart.js](https://www.chartjs.org/) for beautiful data visualization

---

Made with ❤️ by the PollFlow team 