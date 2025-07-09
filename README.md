# PollFlow - Real-Time Polling Application

## The Problem

Traditional polling systems suffer from lack of transparency, delayed results, and poor user engagement. Users can't see real-time updates, results are often hidden until voting ends, and sharing polls is cumbersome. This creates distrust in the voting process and reduces participation.

## The Solution

PollFlow solves these problems by providing **transparent, live voting** where everyone can see results updating in real-time. Users can create polls, share them instantly via QR codes or links, and watch votes come in live with beautiful visualizations. No more waiting for results - see democracy in action, transparently and instantly.

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
- **Socket.io** - For real-time management
- **React Hook Form** - Form handling and validation
- **Zod** - Schema validation
- **Chart.js** - Data visualization
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **Socket.io** - For real-time management
- **bcryptjs** - Password hashing
- **Swagger** - API documentation
- **Rate Limiting** - Request throttling



The frontend will be available at `http://localhost:3000`

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

For swagger documentation: - Kindly access this link - https://polling-app-gleq.onrender.com/api-docs/ 

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

## Preview

[!screenshots](/frontend/public/WhatsApp%20Image%202025-07-09%20at%2021.21.22_71973b5d.jpg)

**Create Account Page**

![screenshots](/frontend/public/WhatsApp%20Image%202025-07-09%20at%2021.47.51_1d967844.jpg)
**Login Page**

![screenshots](/frontend/public/WhatsApp%20Image%202025-07-09%20at%2021.49.11_e519d2b5.jpg)
**Profile page that shows list of polls a user has created**

![screenshots](/frontend/public/WhatsApp%20Image%202025-07-09%20at%2021.50.35_f8bfd62b.jpg)
**Poll Result Page**

![screenshots](/frontend/public/WhatsApp%20Image%202025-07-09%20at%2021.51.35_700b1778.jpg)
**Poll Result Page**

![screenshot](/frontend/public/WhatsApp%20Image%202025-07-09%20at%2021.52.30_f49fa183.jpg)
**Page for Creating Poll**

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

Made with ❤️ by the ART_Redox ©️ 2025.