import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDatabase } from '../database/init.js';
import { AppError } from '../middleware/errorHandler.js';

const db = getDatabase();

export const signup = (req, res, next) => {
  try {
    const { name, email, password, confirmPassword, educationLevel, department } = req.body;

    // Validation
    if (!name || !email || !password || !confirmPassword || !educationLevel || !department) {
      throw new AppError('All fields are required', 400);
    }

    if (password !== confirmPassword) {
      throw new AppError('Passwords do not match', 400);
    }

    if (password.length < 8) {
      throw new AppError('Password must be at least 8 characters', 400);
    }

    // Check if user exists
    const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (existingUser) {
      throw new AppError('Email already registered', 409);
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create user
    const stmt = db.prepare(`
      INSERT INTO users (name, email, password, education_level, department)
      VALUES (?, ?, ?, ?, ?)
    `);

    const result = stmt.run(name, email, hashedPassword, educationLevel, department);

    // Create token
    const token = jwt.sign(
      { id: result.lastInsertRowid, email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: result.lastInsertRowid,
        name,
        email,
        educationLevel,
        department
      }
    });
  } catch (error) {
    next(error);
  }
};

export const login = (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError('Email and password are required', 400);
    }

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new AppError('Invalid email or password', 401);
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        educationLevel: user.education_level,
        department: user.department
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = (req, res, next) => {
  try {
    const user = db.prepare('SELECT id, name, email, education_level, department, created_at FROM users WHERE id = ?')
      .get(req.user.id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      educationLevel: user.education_level,
      department: user.department,
      createdAt: user.created_at
    });
  } catch (error) {
    next(error);
  }
};
