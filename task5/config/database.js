const mysql = require('mysql2/promise');
require('dotenv').config();

// MySQL connection configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME || 'userdb',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
};

// Create MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Test the connection
pool.getConnection()
  .then((connection) => {
    console.log('✅ MySQL Database Connected');
    connection.release();
  })
  .catch((err) => {
    console.error('❌ MySQL Connection Error:', err.message);
    console.log('💡 Make sure MySQL is running and database credentials are correct in .env file');
  });

// Helper function to execute queries
const query = async (sql, params) => {
  const start = Date.now();
  try {
    const [results] = await pool.execute(sql, params);
    const duration = Date.now() - start;
    console.log('Executed query', { sql, duration, rows: results.affectedRows || results.length });
    return {
      rows: Array.isArray(results) ? results : [],
      rowCount: results.affectedRows || results.length,
      insertId: results.insertId
    };
  } catch (error) {
    console.error('Query error', { sql, error: error.message });
    throw error;
  }
};

module.exports = { pool, query };

