import dotenv from 'dotenv';
import app from './app.js';
import { initializeDatabase } from './database/init.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Initialize database
try {
  initializeDatabase();
  console.log('✓ Database initialized');
} catch (error) {
  console.error('✗ Database initialization failed:', error.message);
  process.exit(1);
}

app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
  console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
});
