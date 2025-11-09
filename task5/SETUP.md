# Setup Instructions

## Environment Configuration

Create a `.env` file in the root directory with the following content:

```env
# Server Configuration
PORT=5000
FRONTEND_URL=http://localhost:3000

# MySQL Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=userdb
DB_USER=root
DB_PASSWORD=your_mysql_password_here
```

**Important:** Replace `your_mysql_password_here` with your actual MySQL password.

## Database Setup

1. Make sure MySQL is running
2. Run the database initialization script:
   ```bash
   npm run init-db
   ```

This will:
- Create the database (if it doesn't exist)
- Create the `users` table with fields: `id`, `name`, `email`, `age`
- Insert sample data (if table is empty)

## Test Database Connection

To test your database connection:
```bash
npm run test-db
```

## Start the Server

```bash
npm start
```

The server will run on `http://localhost:5000`

