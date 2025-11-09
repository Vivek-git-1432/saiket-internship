// Database Initialization Script
// Creates the users table with id, name, email, age fields

const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  multipleStatements: true
};

async function initializeDatabase() {
  let connection;
  
  try {
    // Connect to MySQL (without selecting a database first)
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to MySQL server');

    const dbName = process.env.DB_NAME || 'userdb';
    
    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    console.log(`✅ Database '${dbName}' created or already exists`);

    // Use the database
    await connection.query(`USE \`${dbName}\``);
    console.log(`✅ Using database '${dbName}'`);

    // Create users table with only id, name, email, age fields
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        age INT NOT NULL,
        INDEX idx_email (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;

    await connection.query(createTableSQL);
    console.log('✅ Users table created or already exists');

    // Check if table is empty and insert sample data
    const [rows] = await connection.query('SELECT COUNT(*) as count FROM users');
    const count = rows[0].count;

    if (count === 0) {
      const sampleData = [
        ['John Doe', 'john.doe@example.com', 30],
        ['Jane Smith', 'jane.smith@example.com', 25],
        ['Bob Johnson', 'bob.johnson@example.com', 35]
      ];

      const insertSQL = 'INSERT INTO users (name, email, age) VALUES ?';
      await connection.query(insertSQL, [sampleData]);
      console.log('✅ Sample data inserted');
    } else {
      console.log(`ℹ️  Table already contains ${count} user(s)`);
    }

    // Display table structure
    const [tableInfo] = await connection.query('DESCRIBE users');
    console.log('\n📊 Users Table Structure:');
    console.table(tableInfo);

    // Display current data
    const [users] = await connection.query('SELECT * FROM users');
    console.log('\n📋 Current Users:');
    console.table(users);

    console.log('\n✅ Database initialization completed successfully!');

  } catch (error) {
    console.error('❌ Error initializing database:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('✅ Database connection closed');
    }
  }
}

// Run initialization
initializeDatabase();

