# Installation & Setup Guide

Complete guide to install and run the AI Career Roadmap application.

## System Requirements

- **Node.js**: v14 or higher
- **npm**: v6 or higher
- **SQLite3**: Usually comes with Node.js
- **RAM**: Minimum 2GB
- **Disk Space**: Minimum 500MB

## Step-by-Step Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/Manisha-R2405/ai-career-roadmap.git
cd ai-career-roadmap
```

### Step 2: Backend Setup

#### 2.1 Install Dependencies

```bash
cd server
npm install
```

#### 2.2 Create Environment File

```bash
cp .env.example .env
```

Edit `.env` file with your configuration:

```
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
DB_PATH=./database/career_roadmap.db
```

#### 2.3 Initialize Database

```bash
npm run seed-db
```

This will:
- Create the SQLite database
- Create all tables
- Seed with 33+ career roles
- Create a demo user account

#### 2.4 Start Backend Server

```bash
npm start
```

You should see:
```
Server is running on port 5000
Database initialized successfully
```

### Step 3: Frontend Setup

#### 3.1 Open New Terminal and Navigate to Client

```bash
cd client
npm install
```

#### 3.2 Create Environment File

```bash
cp .env.example .env
```

Default value is usually fine:
```
REACT_APP_API_URL=http://localhost:5000/api
```

#### 3.3 Start Frontend Application

```bash
npm start
```

The application will automatically open in your browser at `http://localhost:3000`

## Running the Application

Once both servers are running:

1. **Open Browser**: Navigate to `http://localhost:3000`
2. **Login with Demo Account**:
   - Email: `demo@example.com`
   - Password: `Demo@12345`
3. **Or Create New Account**: Click "Sign Up" and fill in the details

## Available Scripts

### Backend Scripts

```bash
# Start development server
npm start

# Initialize and seed database
npm run seed-db

# Run tests (if available)
npm test
```

### Frontend Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests (if available)
npm test

# Eject configuration (one-way operation)
npm run eject
```

## Troubleshooting

### Port Already in Use

If port 5000 is already in use:

```bash
# Linux/Mac: Find and kill process
lsof -i :5000
kill -9 <PID>

# Windows: Find and kill process
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

Or change the PORT in `.env`:
```
PORT=5001
```

### Database Issues

If you get database errors:

1. Delete the database file:
   ```bash
   rm server/database/career_roadmap.db
   ```

2. Re-initialize:
   ```bash
   npm run seed-db
   ```

### Dependencies Installation Error

Clear npm cache and reinstall:

```bash
cd server
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

cd ../client
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### CORS Issues

If you get CORS errors:

1. Ensure backend is running on port 5000
2. Ensure `REACT_APP_API_URL=http://localhost:5000/api` in client/.env
3. Restart both servers

## Database Structure

The SQLite database includes:

```
├── users (user accounts)
├── user_skills (user's technical skills)
├── user_interests (career interests)
├── roadmaps (career roadmaps)
├── roadmap_phases (phases in roadmap)
├── roadmap_tasks (tasks within phases)
├── roadmap_skills (skills needed per phase)
├── roles (career roles)
├── role_skills (skills needed per role)
├── projects (practice projects)
├── interview_questions (interview questions)
└── interview_answers (user's answers)
```

## API Testing

You can test the API using tools like:
- **Postman**: https://www.postman.com/
- **Thunder Client** (VS Code extension)
- **cURL**:
  ```bash
  curl -X POST http://localhost:5000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"demo@example.com","password":"Demo@12345"}'
  ```

## Production Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for production setup instructions.

## Need Help?

- Check the main [README.md](../README.md)
- Review [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- Open an issue on GitHub
- Email: manisha240507@gmail.com
