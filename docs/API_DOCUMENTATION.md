# API Documentation

Complete API documentation for AI Career Roadmap.

## Base URL

```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Response Format

All responses are in JSON format:

```json
{
  "data": {},
  "message": "Success message",
  "error": null
}
```

## Error Handling

Error responses include appropriate HTTP status codes:

```json
{
  "error": "Error message",
  "status": 400
}
```

### Common Error Codes
- `400`: Bad Request
- `401`: Unauthorized (invalid token)
- `403`: Forbidden
- `404`: Not Found
- `409`: Conflict (duplicate email)
- `500`: Server Error

## Endpoints

### Authentication

#### Register User

```
POST /auth/signup
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123",
  "confirmPassword": "SecurePassword123",
  "educationLevel": "UG",
  "department": "CSE"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "educationLevel": "UG",
    "department": "CSE"
  }
}
```

#### Login User

```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "educationLevel": "UG",
    "department": "CSE"
  }
}
```

#### Get Current User

```
GET /auth/me
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "educationLevel": "UG",
  "department": "CSE",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

### User Profile

#### Update Profile

```
PUT /user/profile
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "John Doe Updated",
  "education_level": "PG",
  "department": "AIML",
  "current_stage": "2nd Year"
}
```

**Response (200):**
```json
{
  "message": "Profile updated successfully"
}
```

### Skills

#### Get All Skills

```
GET /skills
```

**Response (200):**
```json
{
  "skills": ["Python", "Java", "JavaScript", "C++", ...]
}
```

#### Get Skills by Department

```
GET /skills/department/:department
```

**Example:**
```
GET /skills/department/CSE
```

**Response (200):**
```json
{
  "skills": [
    {
      "skill_name": "Python",
      "importance": "High"
    },
    {
      "skill_name": "Web Development",
      "importance": "Medium"
    }
  ]
}
```

#### Get Skills by Role

```
GET /skills/role/:roleId
```

**Response (200):**
```json
{
  "skills": [
    {
      "skill_name": "React",
      "importance": "High"
    }
  ]
}
```

#### Add User Skill

```
POST /user/skills
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "skillName": "Python",
  "skillLevel": "Intermediate"
}
```

**Response (201):**
```json
{
  "id": 1,
  "skillName": "Python",
  "skillLevel": "Intermediate"
}
```

#### Get User Skills

```
GET /user/skills
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "skills": [
    {
      "id": 1,
      "skill_name": "Python",
      "skill_level": "Intermediate",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

#### Delete User Skill

```
DELETE /user/skills/:skillId
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Skill deleted successfully"
}
```

### Roadmaps

#### Create Roadmap

```
POST /roadmaps
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Full Stack Developer Path",
  "educationLevel": "UG",
  "department": "CSE",
  "currentStage": "2nd Year",
  "targetRole": "Full Stack Developer",
  "careerGoal": "Become a lead developer in 3 years",
  "availableTime": "Part-time"
}
```

**Response (201):**
```json
{
  "id": 1,
  "message": "Roadmap created successfully"
}
```

#### Get User's Roadmaps

```
GET /roadmaps
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "roadmaps": [
    {
      "id": 1,
      "title": "Full Stack Developer Path",
      "target_role": "Full Stack Developer",
      "department": "CSE",
      "completion_percentage": 25,
      "created_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

#### Get Roadmap Details

```
GET /roadmaps/:id
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "roadmap": {
    "id": 1,
    "title": "Full Stack Developer Path",
    "target_role": "Full Stack Developer",
    "department": "CSE",
    "current_stage": "2nd Year",
    "career_goal": "Become a lead developer in 3 years",
    "completion_percentage": 25
  },
  "phases": [
    {
      "id": 1,
      "phase_number": 1,
      "phase_name": "Foundation",
      "description": "Learn fundamentals"
    }
  ]
}
```

#### Get Roadmap Phases

```
GET /roadmaps/:id/phases
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "phases": [
    {
      "id": 1,
      "phase_number": 1,
      "phase_name": "Foundation",
      "duration": "3 months",
      "completion_percentage": 50,
      "tasks": [],
      "skills": []
    }
  ]
}
```

#### Update Roadmap Progress

```
PUT /roadmaps/:id/progress
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "completionPercentage": 50
}
```

**Response (200):**
```json
{
  "message": "Roadmap progress updated"
}
```

#### Delete Roadmap

```
DELETE /roadmaps/:id
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Roadmap deleted successfully"
}
```

### Roles

#### Get All Roles

```
GET /roles
```

**Response (200):**
```json
{
  "roles": [
    {
      "id": 1,
      "role_name": "Software Engineer",
      "department": "CSE",
      "description": "Develops software applications"
    }
  ]
}
```

#### Get Roles by Department

```
GET /roles/department/:department
```

**Response (200):**
```json
{
  "roles": [
    {
      "id": 1,
      "role_name": "Software Engineer",
      "department": "CSE"
    }
  ]
}
```

#### Get Role Details

```
GET /roles/:id
```

**Response (200):**
```json
{
  "role": {
    "id": 1,
    "role_name": "Software Engineer",
    "department": "CSE",
    "description": "Develops software applications"
  },
  "skills": [
    {
      "skill_name": "Python",
      "importance": "High"
    }
  ],
  "projects": []
}
```

### Interview Practice

#### Get Interview Questions

```
GET /interview/roadmap/:roadmapId
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "questions": [
    {
      "id": 1,
      "question": "What is a closure in JavaScript?",
      "topic": "JavaScript",
      "difficulty": "Medium",
      "expected_concepts": "Scope, function scope, lexical scope"
    }
  ]
}
```

#### Submit Interview Answer

```
POST /interview/question/:questionId/answer
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "answer": "A closure is a function that has access to..."
}
```

**Response (201):**
```json
{
  "id": 1,
  "message": "Answer submitted successfully"
}
```

#### Get Interview Stats

```
GET /interview/roadmap/:roadmapId/stats
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "stats": {
    "total_questions": 10,
    "answered_questions": 6,
    "average_score": 75.5,
    "good_answers": 4
  }
}
```

## Rate Limiting

Currently, there is no rate limiting. In production, consider implementing rate limiting using middleware like `express-rate-limit`.

## Pagination

Some endpoints support pagination using query parameters:
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

## Sorting

Some endpoints support sorting using query parameters:
- `sort` - Field to sort by
- `order` - Sort order (asc/desc)

## Versioning

Currently on version 1.0.0. Future versions may introduce breaking changes with version prefixes (e.g., `/api/v2/`).
