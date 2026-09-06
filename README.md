# AI Career Roadmap Generator

An intelligent, full-stack web application that helps students, freshers, working professionals, and research scholars create personalized career roadmaps based on their education level, skills, interests, and career goals.

## 🎯 Features

- **Authentication**: Secure JWT-based login and signup
- **User Profiles**: Manage education level, department, skills, and career interests
- **Smart Roadmap Generation**: AI-powered recommendation engine that creates personalized career paths
- **Multiple Roadmaps**: Create and manage multiple career roadmaps
- **Dynamic Roadmap Visualization**: Interactive timeline with phases, tasks, and progress tracking
- **Skill Gap Analysis**: Compare your skills with target role requirements
- **Role Recommendations**: Get intelligent career role suggestions based on your profile
- **Interview Preparation**: 10 auto-generated interview questions with scoring
- **Progress Tracking**: Real-time progress updates as you complete tasks
- **PDF Download**: Export your roadmap as a professional PDF
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark Mode**: Toggle between light and dark themes
- **Search & Filter**: Find roadmaps, roles, and skills easily
- **Roadmap History**: Access all previously created roadmaps

## 🛠 Technology Stack

### Frontend
- React.js with React Router
- Tailwind CSS for styling
- Lucide React for icons
- Recharts for data visualization
- Axios for API calls
- jsPDF for PDF generation

### Backend
- Node.js with Express.js
- SQLite database (better-sqlite3)
- JWT for authentication
- bcryptjs for password hashing
- Cors for cross-origin requests

### Database
- SQLite3 with proper schema and relationships
- Foreign keys enabled
- Indexed queries for performance

## 📁 Project Structure

```
ai-career-roadmap/
├── client/                          # React frontend
│   ├── src/
│   │   ├── components/              # Reusable React components
│   │   ├── pages/                   # Page components
│   │   ├── layouts/                 # Layout components
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── services/                # API service calls
│   │   ├── utils/                   # Utility functions
│   │   ├── context/                 # React context for state
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── server/                          # Express backend
│   ├── controllers/                 # Route controllers
│   ├── routes/                      # API routes
│   ├── middleware/                  # Express middleware
│   ├── services/                    # Business logic
│   ├── utils/                       # Utility functions
│   ├── database/                    # Database setup
│   ├── models/                      # Data models
│   ├── app.js                       # Express app
│   ├── server.js                    # Server entry point
│   ├── package.json
│   └── .env.example
│
├── database/
│   └── career_roadmap.db            # SQLite database
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn
- Git

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
   ```

3. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   ```

### Environment Setup

Create `.env` in the `server` directory:

```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here_change_in_production
DATABASE_PATH=../database/career_roadmap.db
```

### Running the Application

**Terminal 1 - Backend:**
```bash
cd server
npm run seed        # Initialize database with seed data
npm start           # Start server on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev         # Start frontend on http://localhost:5173
```

### Initialize Database

The database will be automatically initialized when you run `npm run seed` in the server directory.

### Open Database in DB Browser

1. Download [DB Browser for SQLite](https://sqlitebrowser.org/)
2. Open the file: `database/career_roadmap.db`
3. Browse tables, run queries, and inspect data

## 📊 Database Schema

### Core Tables

- **users**: User accounts with authentication
- **user_skills**: User's technical and soft skills
- **user_interests**: User's career interests
- **roadmaps**: Generated career roadmaps
- **roadmap_phases**: Phases within each roadmap (Foundation, Core, Advanced, etc.)
- **roadmap_tasks**: Tasks within each phase
- **roadmap_skills**: Skills required for each phase
- **roles**: Career roles/positions
- **role_skills**: Skills required for each role
- **projects**: Recommended projects for roles
- **interview_questions**: Interview preparation questions
- **interview_answers**: User's interview answers and scores
- **resources**: Learning resources and recommendations

See `server/database/schema.sql` for detailed schema.

## 🔐 Authentication

### Signup
```
POST /api/auth/signup
Body: { name, email, password, confirmPassword, educationLevel, department }
```

### Login
```
POST /api/auth/login
Body: { email, password }
Returns: { token, user }
```

### Protected Routes
All authenticated endpoints require `Authorization: Bearer <token>` header.

## 📋 API Documentation

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### User Profile
- `GET /api/user/profile` - Get user profile (protected)
- `PUT /api/user/profile` - Update user profile (protected)

### Skills
- `GET /api/skills` - Get all available skills
- `POST /api/user/skills` - Add skill to user (protected)
- `DELETE /api/user/skills/:id` - Remove skill (protected)

### Roadmaps
- `POST /api/roadmaps` - Create new roadmap (protected)
- `GET /api/roadmaps` - Get user's roadmaps (protected)
- `GET /api/roadmaps/:id` - Get specific roadmap (protected)
- `PUT /api/roadmaps/:id` - Update roadmap (protected)
- `DELETE /api/roadmaps/:id` - Delete roadmap (protected)

### Tasks
- `PUT /api/tasks/:id` - Mark task complete/incomplete (protected)

### Roles
- `GET /api/roles/recommended` - Get recommended roles (protected)

### Interview Preparation
- `GET /api/roadmaps/:id/interview` - Get interview questions (protected)
- `POST /api/interview/:questionId/answer` - Submit interview answer (protected)

### PDF Export
- `GET /api/roadmaps/:id/pdf` - Download roadmap as PDF (protected)

## 👤 Demo Credentials

**Email**: demo@example.com  
**Password**: Demo@12345

## 🎓 Supported Education Levels

- Undergraduate (UG)
- Postgraduate (PG)
- Fresher
- Working Employee
- Research Scholar

## 🏢 Supported Departments

- Computer Science and Engineering (CSE)
- Information Technology (IT)
- Artificial Intelligence and Machine Learning (AIML)
- Electronics and Communication Engineering (ECE)
- Electrical and Electronics Engineering (EEE)
- Mechanical Engineering (MECH)
- Civil Engineering
- Agricultural Engineering
- Arts
- Science
- Other

## 💼 Sample Career Roles

### CSE/IT/AIML
Software Engineer, Frontend Developer, Backend Developer, Full Stack Developer, Data Analyst, Data Scientist, ML Engineer, AI Engineer, Cloud Engineer, DevOps Engineer, Cybersecurity Analyst

### ECE
Embedded Systems Engineer, VLSI Engineer, IoT Engineer, Firmware Engineer

### EEE
Electrical Engineer, Power Systems Engineer, Control Systems Engineer

### MECH
Mechanical Design Engineer, CAD Engineer, Manufacturing Engineer, Robotics Engineer

### CIVIL
Structural Engineer, Site Engineer, Construction Engineer

### AGRICULTURE
Agricultural Engineer, Precision Agriculture Specialist, Agri-Tech Specialist

### ARTS
Content Strategist, Digital Marketing Specialist, UX Writer, HR Specialist

### SCIENCE
Research Scientist, Data Analyst, Laboratory Analyst

## 🔄 Roadmap Generation Logic

The recommendation engine analyzes:
- Education level and current year/stage
- Department and available opportunities
- User's existing skills
- Target role and required skills
- Career goals and timeline
- Interest alignment

It then generates a phase-based roadmap with:
1. **Foundation Phase**: Basic concepts and fundamentals
2. **Core Skills Phase**: Essential technical skills
3. **Advanced Phase**: Specialized and advanced topics
4. **Specialization Phase**: Role-specific expertise
5. **Projects**: Practical application and portfolio building
6. **Interview Prep**: Technical and behavioral questions
7. **Job Readiness**: Resume, applications, and negotiations

## 📈 Progress Tracking

Progress is automatically calculated based on completed tasks:
- Task completion updates phase progress
- Phase completion updates roadmap progress
- Progress updates dashboard statistics in real-time
- No manual entry required

## 🎯 Smart Features

### Skill Gap Analysis
Compares user's current skills against target role requirements and shows:
- Skills already acquired
- Skills needed to learn
- Skill match percentage
- Priority of each missing skill

### Role Recommendations
Intelligent matching based on:
- Department alignment (30%)
- Skills match (40%)
- Interest alignment (20%)
- Education level (10%)

### Interview Question Generation
Auto-generates 10 interview questions based on:
- Target role
- Required skills
- User's experience level
- Department specialization

### Scoring System
Rule-based evaluation with:
- Keyword matching
- Concept validation
- Scoring rubric
- Feedback and recommendations

## 🌐 Responsive Design

- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-friendly navigation
- Optimized performance for all devices

## 🌙 Dark Mode

- Light/Dark theme toggle
- Persistent preference using localStorage
- Smooth transitions between themes

## 🔍 Search & Filter

- Search roadmaps by target role
- Filter by department
- Filter by education level
- Filter by status

## 📝 Future Enhancements

- Integration with OpenAI/Gemini API for AI-powered recommendations
- Collaboration features (share roadmaps, team roadmaps)
- Real-time notifications
- Advanced analytics and insights
- Mentor matching system
- Industry partnership integrations
- Mobile app (React Native)
- Social features (forums, discussions)
- Gamification (badges, achievements)
- Video tutorials and courses
- Live interview simulations

## 🛡️ Security Features

- Passwords hashed with bcryptjs
- JWT-based stateless authentication
- Protected API routes with middleware
- Input validation and sanitization
- CORS configuration
- SQL injection prevention via parameterized queries
- Environment variables for sensitive data
- No plain text password storage

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Manisha-R2405**

## 🤝 Contributing

Contributions are welcome! Feel free to fork, create feature branches, and submit pull requests.

## 📞 Support

For issues and questions, please open a GitHub issue in the repository.

---

**Built with ❤️ for students and professionals pursuing their dream careers.**
