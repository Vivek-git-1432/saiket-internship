// Database Connection Test Script

const { pool } = require('../config/database');

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Successfully connected to MySQL database');
    
    // Test query
    const [rows] = await connection.query('SELECT DATABASE() as current_db, NOW() as server_time');
    console.log('📊 Database Info:');
    console.table(rows);
    
    // Check if users table exists
    const [tables] = await connection.query(
      "SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users'"
    );
    
    if (tables.length > 0) {
      console.log('✅ Users table exists');
      
      // Get table structure
      const [tableInfo] = await connection.query('DESCRIBE users');
      console.log('\n📊 Users Table Structure:');
      console.table(tableInfo);
      
      // Get row count
      const [count] = await connection.query('SELECT COUNT(*) as count FROM users');
      console.log(`\n📋 Total users: ${count[0].count}`);
    } else {
      console.log('⚠️  Users table does not exist. Run: npm run init-db');
    }
    
    connection.release();
    console.log('\n✅ Connection test completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    console.error('\n💡 Make sure:');
    console.error('   1. MySQL server is running');
    console.error('   2. Database credentials in .env file are correct');
    console.error('   3. Database exists (run: npm run init-db)');
    process.exit(1);
  }
}

testConnection();

