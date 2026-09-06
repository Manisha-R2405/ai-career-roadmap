import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, '../../database/career_roadmap.db');

let db;

export const getDatabase = () => {
  if (!db) {
    // Create database directory if it doesn't exist
    const dbDir = path.dirname(dbPath);
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }

    db = new Database(dbPath);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
  }
  return db;
};

export const initializeDatabase = () => {
  const database = getDatabase();
  const schemaPath = path.join(__dirname, 'schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf-8');
  
  // Execute schema statements
  const statements = schema.split(';').filter(s => s.trim());
  statements.forEach(statement => {
    try {
      database.exec(statement);
    } catch (error) {
      console.warn('Schema statement warning:', error.message);
    }
  });
};

export const closeDatabase = () => {
  if (db) {
    db.close();
    db = null;
  }
};
