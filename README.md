# AI Career Roadmap

A personalized career guidance platform powered by AI that helps students and professionals plan their career paths across various engineering disciplines.

## 🎯 Features

- **Personalized Career Roadmaps**: Create custom career paths based on education level, department, and career goals
- **Skill Tracking**: Track and manage skills with proficiency levels
- **Career Roles Explorer**: Browse 30+ career paths across different engineering disciplines
- **Interview Practice**: AI-powered interview questions and answer tracking
- **Progress Monitoring**: Visual progress tracking for roadmaps and skill development
- **Department Support**: 9 departments covered (CSE, IT, AIML, ECE, EEE, MECH, CIVIL, AGRICULTURE, ARTS)

## 🏗️ Tech Stack

### Backend
- **Node.js** with Express.js
- **SQLite** for database
- **JWT** for authentication
- **bcryptjs** for password hashing

### Frontend
- **React 18** with React Router v6
- **Zustand** for state management
- **Tailwind CSS** for styling
- **Axios** for API calls
- **React Icons** for UI icons
- **Recharts** for data visualization
- **React Toastify** for notifications

## 📁 Project Structure

```
ai-career-roadmap/
├── server/
│   ├── controllers/      # API controller logic
│   ├── routes/          # API routes
│   ├── middleware/      # Authentication & error handling
│   ├── database/        # Database setup & schema
│   ├── .env.example     # Environment variables template
│   ├── app.js          # Express app setup
│   ├── server.js       # Server entry point
│   └── package.json    # Backend dependencies
├── client/
│   ├── src/
│   │   ├── pages/      # React pages
│   │   ├── components/ # Reusable components
│   │   ├── services/   # API service layer
│   │   ├── store/      # Zustand stores
│   │   ├── styles/     # CSS & Tailwind config
│   │   ├── App.jsx     # Main App component
│   │   └── index.jsx   # React entry point
│   ├── public/         # Static files
│   ├── .env.example    # Environment variables template
│   └── package.json    # Frontend dependencies
├── docs/              # Documentation
├── README.md          # This file
└── .gitignore        # Git ignore rules
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- SQLite3

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Manisha-R2405/ai-career-roadmap.git
   cd ai-career-roadmap
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   
   # Create .env file
   cp .env.example .env
   
   # Initialize database
   npm run seed-db
   ```

3. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   
   # Create .env file
   cp .env.example .env
   ```

4. **Start Development Servers**
   
   Terminal 1 - Backend:
   ```bash
   cd server
   npm start
   ```
   
   Terminal 2 - Frontend:
   ```bash
   cd client
   npm start
   ```

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here
DB_PATH=./database/career_roadmap.db
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 🔑 Demo Account

- **Email**: demo@example.com
- **Password**: Demo@12345

## 📚 API Documentation

### Authentication Routes
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### User Routes
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/skills` - Get user skills
- `POST /api/user/skills` - Add new skill
- `DELETE /api/user/skills/:skillId` - Delete skill
- `GET /api/user/interests` - Get user interests
- `POST /api/user/interests` - Add new interest
- `DELETE /api/user/interests/:interestId` - Delete interest

### Roadmap Routes
- `POST /api/roadmaps` - Create roadmap
- `GET /api/roadmaps` - Get user's roadmaps
- `GET /api/roadmaps/:id` - Get roadmap details
- `GET /api/roadmaps/:id/phases` - Get roadmap phases
- `PUT /api/roadmaps/:id/progress` - Update progress
- `DELETE /api/roadmaps/:id` - Delete roadmap

### Skills Routes
- `GET /api/skills` - Get all skills
- `GET /api/skills/department/:department` - Get skills by department
- `GET /api/skills/role/:roleId` - Get skills by role

### Roles Routes
- `GET /api/roles` - Get all roles
- `GET /api/roles/department/:department` - Get roles by department
- `GET /api/roles/:id` - Get role details
- `GET /api/roles/:id/projects` - Get projects for role

### Interview Routes
- `GET /api/interview/roadmap/:roadmapId` - Get interview questions
- `GET /api/interview/question/:questionId` - Get question details
- `POST /api/interview/question/:questionId/answer` - Submit answer
- `GET /api/interview/answer/:answerId/feedback` - Get answer feedback
- `GET /api/interview/roadmap/:roadmapId/stats` - Get interview stats

## 🎓 Supported Departments

1. **Computer Science Engineering (CSE)**
   - Software Engineer, Frontend Developer, Backend Developer, Full Stack Developer, Cloud Engineer, DevOps Engineer, Cybersecurity Analyst, Database Administrator

2. **Information Technology (IT)**
   - Data Analyst, IT Support Specialist, System Administrator, Database Administrator

3. **AI & Machine Learning (AIML)**
   - Data Scientist, Machine Learning Engineer, AI Engineer

4. **Electronics & Communication (ECE)**
   - Embedded Systems Engineer, VLSI Engineer, IoT Engineer, Firmware Engineer

5. **Electrical & Electronics (EEE)**
   - Electrical Engineer, Power Systems Engineer, Control Systems Engineer

6. **Mechanical Engineering (MECH)**
   - Mechanical Design Engineer, CAD Engineer, Manufacturing Engineer, Robotics Engineer

7. **Civil Engineering (CIVIL)**
   - Structural Engineer, Site Engineer, BIM Engineer

8. **Agriculture Engineering (AGRICULTURE)**
   - Agricultural Engineer, Precision Agriculture Specialist, Agri-Tech Specialist

9. **Arts & Humanities (ARTS)**
   - Content Strategist, Digital Marketing Specialist, UX Writer, HR Specialist

## 📊 Database Schema

The application uses SQLite with the following main tables:
- `users` - User accounts and profiles
- `user_skills` - User's acquired skills
- `user_interests` - User's career interests
- `roadmaps` - Career roadmaps
- `roadmap_phases` - Phases within a roadmap
- `roadmap_tasks` - Tasks within phases
- `roadmap_skills` - Skills required per phase
- `roles` - Career roles
- `role_skills` - Skills required for roles
- `projects` - Practice projects
- `interview_questions` - Interview practice questions
- `interview_answers` - User's submitted interview answers

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Protected API routes
- Environment variable configuration
- SQL injection prevention with parameterized queries

## 🚢 Deployment

### Deploying to Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   heroku login
   ```

2. **Create Heroku app**
   ```bash
   heroku create ai-career-roadmap
   ```

3. **Set environment variables**
   ```bash
   heroku config:set JWT_SECRET=your_secret_key
   heroku config:set NODE_ENV=production
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

### Deploying Frontend to Vercel

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to vercel.com
   - Import your GitHub repository
   - Set build command: `npm run build`
   - Set output directory: `build`

3. **Set environment variables in Vercel dashboard**
   - `REACT_APP_API_URL=https://your-heroku-app.herokuapp.com/api`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Author

**Manisha Rajalingam**
- GitHub: [@Manisha-R2405](https://github.com/Manisha-R2405)

## 📞 Support

For support, email manisha240507@gmail.com or open an issue on GitHub.

## 🎉 Acknowledgments

- React community for excellent documentation
- Tailwind CSS for beautiful styling
- Express.js for robust backend framework
- SQLite for reliable database
