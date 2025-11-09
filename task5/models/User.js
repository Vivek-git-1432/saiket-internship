const { query } = require('../config/database');

class User {
  // Get all users
  static async findAll() {
    const result = await query('SELECT * FROM users ORDER BY id ASC');
    return result.rows;
  }

  // Get user by ID
  static async findById(id) {
    const result = await query('SELECT * FROM users WHERE id = ?', [id]);
    return result.rows[0];
  }

  // Get user by email
  static async findByEmail(email) {
    const result = await query('SELECT * FROM users WHERE email = ?', [email]);
    return result.rows[0];
  }

  // Create new user
  static async create(userData) {
    const { name, email, age } = userData;
    const result = await query(
      'INSERT INTO users (name, email, age) VALUES (?, ?, ?)',
      [name, email, age]
    );
    // MySQL doesn't support RETURNING, so fetch the inserted record
    const newUser = await query('SELECT * FROM users WHERE id = ?', [result.insertId]);
    return newUser.rows[0];
  }

  // Update user
  static async update(id, userData) {
    const { name, email, age } = userData;
    await query(
      'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?',
      [name, email, age, id]
    );
    // MySQL doesn't support RETURNING, so fetch the updated record
    const updatedUser = await query('SELECT * FROM users WHERE id = ?', [id]);
    return updatedUser.rows[0];
  }

  // Delete user
  static async delete(id) {
    // MySQL doesn't support RETURNING, so fetch before delete
    const user = await query('SELECT * FROM users WHERE id = ?', [id]);
    if (user.rows.length === 0) {
      return null;
    }
    await query('DELETE FROM users WHERE id = ?', [id]);
    return user.rows[0];
  }
}

module.exports = User;
