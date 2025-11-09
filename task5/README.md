# User REST API with MySQL Database

A RESTful API built with Express.js and MySQL for managing user data (name, email, age).

## Features

- ✅ **SQL Database Integration** - Uses MySQL for data storage
- ✅ **RESTful API** - Full CRUD operations for users

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher) or XAMPP
- npm or yarn

## Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd task5
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up MySQL**
   - Make sure MySQL is installed and running
   - Create a database:
     ```sql
     CREATE DATABASE userdb;
     ```
   - Or use MySQL Workbench or command line:
     ```bash
     mysql -u root -p
     CREATE DATABASE userdb;
     ```

4. **Configure environment variables**
   - Update the `.env` file with your database credentials:
     ```
     DB_HOST=localhost
     DB_PORT=3306
     DB_NAME=userdb
     DB_USER=root
     DB_PASSWORD=your_mysql_password
     ```

5. **Initialize the database**
   ```bash
   npm run init-db
   ```
   This will:
   - Create the `users` table
   - Create indexes for better performance
   - Insert sample data

6. **Start the server**
   ```bash
   npm start
   ```

The server will run on `http://localhost:5000`

## API Endpoints

### Base URL: `http://localhost:5000/api/users`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create new user |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

### Example Requests

#### Get All Users
```bash
GET http://localhost:5000/api/users
```

#### Get User by ID
```bash
GET http://localhost:5000/api/users/1
```

#### Create User
```bash
POST http://localhost:5000/api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30
}
```

#### Update User
```bash
PUT http://localhost:5000/api/users/1
Content-Type: application/json

{
  "name": "John Doe Updated",
  "email": "john.updated@example.com",
  "age": 31
}
```

#### Delete User
```bash
DELETE http://localhost:5000/api/users/1
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  age INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

## Project Structure

```
task5/
├── config/
│   └── database.js          # MySQL connection configuration
├── models/
│   └── User.js              # User model with SQL queries
├── routes/
│   └── userRoutes.js        # API routes for users
├── scripts/
│   ├── initDatabase.js     # Database initialization script
│   └── testConnection.js   # Database connection test script
├── server.js               # Express server setup
├── package.json            # Dependencies
└── .env                    # Environment variables (MySQL config)
```

## Skills Demonstrated

- ✅ **Basic SQL** - CREATE, SELECT, INSERT, UPDATE, DELETE queries
- ✅ **Database Connection** - MySQL connection pool management
- ✅ **API Integration** - RESTful API with Express.js
- ✅ **Express Basics** - Middleware, routing, error handling

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL** - SQL database
- **mysql2** - MySQL client for Node.js
- **dotenv** - Environment variable management
- **cors** - Cross-origin resource sharing
- **morgan** - HTTP request logger

## Notes

- The API uses SQL queries directly (not an ORM) to demonstrate SQL knowledge
- Connection pooling is implemented for better performance
- All endpoints return JSON responses with success/error status
- Email uniqueness is enforced at the database level
- Uses parameterized queries (`?` placeholders) to prevent SQL injection

## Additional Resources

- **View Data:** See `HOW_TO_VIEW_DATA.md` for how to view your data in MySQL
- **Project Structure:** See `PROJECT_STRUCTURE.md` for detailed project organization

