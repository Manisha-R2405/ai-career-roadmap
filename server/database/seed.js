import { getDatabase } from './init.js';
import bcrypt from 'bcryptjs';

const db = getDatabase();

export const seedDatabase = () => {
  try {
    // Clear existing data
    db.exec('DELETE FROM roles');
    db.exec('DELETE FROM users');

    // Seed roles
    const roles = [
      // CSE/IT/AIML roles
      { role_name: 'Software Engineer', department: 'CSE', description: 'Develop and maintain software applications' },
      { role_name: 'Frontend Developer', department: 'CSE', description: 'Build user interfaces and web applications' },
      { role_name: 'Backend Developer', department: 'CSE', description: 'Develop server-side logic and APIs' },
      { role_name: 'Full Stack Developer', department: 'CSE', description: 'Work with both frontend and backend' },
      { role_name: 'Data Scientist', department: 'AIML', description: 'Analyze data and build ML models' },
      { role_name: 'Machine Learning Engineer', department: 'AIML', description: 'Develop and deploy ML solutions' },
      { role_name: 'AI Engineer', department: 'AIML', description: 'Build AI-powered applications' },
      { role_name: 'Data Analyst', department: 'IT', description: 'Analyze business data and create insights' },
      { role_name: 'Cloud Engineer', department: 'CSE', description: 'Design and manage cloud infrastructure' },
      { role_name: 'DevOps Engineer', department: 'CSE', description: 'Manage deployment and operations' },
      { role_name: 'Cybersecurity Analyst', department: 'CSE', description: 'Protect systems from cyber threats' },
      { role_name: 'Database Administrator', department: 'IT', description: 'Manage databases and data systems' },
      
      // ECE roles
      { role_name: 'Embedded Systems Engineer', department: 'ECE', description: 'Develop embedded systems' },
      { role_name: 'VLSI Engineer', department: 'ECE', description: 'Design integrated circuits' },
      { role_name: 'IoT Engineer', department: 'ECE', description: 'Develop IoT solutions' },
      { role_name: 'Firmware Engineer', department: 'ECE', description: 'Develop firmware for devices' },
      
      // EEE roles
      { role_name: 'Electrical Engineer', department: 'EEE', description: 'Design electrical systems' },
      { role_name: 'Power Systems Engineer', department: 'EEE', description: 'Work with power systems' },
      { role_name: 'Control Systems Engineer', department: 'EEE', description: 'Design control systems' },
      
      // MECH roles
      { role_name: 'Mechanical Design Engineer', department: 'MECH', description: 'Design mechanical systems' },
      { role_name: 'CAD Engineer', department: 'MECH', description: 'Create technical drawings and models' },
      { role_name: 'Manufacturing Engineer', department: 'MECH', description: 'Optimize manufacturing processes' },
      { role_name: 'Robotics Engineer', department: 'MECH', description: 'Design and develop robots' },
      
      // CIVIL roles
      { role_name: 'Structural Engineer', department: 'CIVIL', description: 'Design structures and buildings' },
      { role_name: 'Site Engineer', department: 'CIVIL', description: 'Manage construction projects' },
      { role_name: 'BIM Engineer', department: 'CIVIL', description: 'Work with Building Information Modeling' },
      
      // AGRICULTURE roles
      { role_name: 'Agricultural Engineer', department: 'AGRICULTURE', description: 'Develop agricultural technologies' },
      { role_name: 'Precision Agriculture Specialist', department: 'AGRICULTURE', description: 'Use data for precision farming' },
      { role_name: 'Agri-Tech Specialist', department: 'AGRICULTURE', description: 'Develop agriculture tech solutions' },
      
      // ARTS roles
      { role_name: 'Content Strategist', department: 'ARTS', description: 'Plan and create content' },
      { role_name: 'Digital Marketing Specialist', department: 'ARTS', description: 'Manage digital marketing campaigns' },
      { role_name: 'UX Writer', department: 'ARTS', description: 'Write for user interfaces' },
      { role_name: 'HR Specialist', department: 'ARTS', description: 'Manage human resources' }
    ];

    const roleStmt = db.prepare(`
      INSERT INTO roles (role_name, department, description)
      VALUES (?, ?, ?)
    `);

    roles.forEach(role => {
      roleStmt.run(role.role_name, role.department, role.description);
    });

    // Seed demo user
    const hashedPassword = bcrypt.hashSync('Demo@12345', 10);
    const userStmt = db.prepare(`
      INSERT INTO users (name, email, password, education_level, department, current_stage)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    userStmt.run('Demo User', 'demo@example.com', hashedPassword, 'UG', 'CSE', '3rd Year');

    console.log('✓ Database seeded successfully');
    console.log('✓ Demo user created: demo@example.com / Demo@12345');
  } catch (error) {
    console.error('✗ Seeding failed:', error.message);
    throw error;
  }
};

// Run seed if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase();
}

export default seedDatabase;
