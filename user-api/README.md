# 🚀 User REST API

A beautiful, modern, and fully-featured REST API for user management built with Node.js and Express. This project demonstrates best practices in REST API design, data validation, error handling, and includes a stunning web interface for managing users.

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Express](https://img.shields.io/badge/Express-5.1-blue)
![License](https://img.shields.io/badge/License-ISC-yellow)

## ✨ Features

- **Complete CRUD Operations** - Create, Read, Update, and Delete users
- **Beautiful Web Dashboard** - Modern, responsive UI for managing users
- **Comprehensive API Documentation** - Interactive API docs with examples
- **Data Validation** - Email validation, age constraints, and input sanitization
- **Error Handling** - Consistent error responses with proper HTTP status codes
- **Search Functionality** - Real-time search across all user fields
- **Statistics Dashboard** - View user statistics at a glance
- **RESTful Design** - Follows REST API best practices
- **Postman Ready** - Fully tested and ready for Postman integration

## 🎯 Project Structure

```
user-api/
├── server.js              # Main server file
├── routes/
│   └── userRoutes.js      # User API routes
├── data/
│   └── users.js          # In-memory data storage
├── public/
│   ├── index.html        # User management dashboard
│   └── api-docs.html     # API documentation page
├── package.json          # Project dependencies
└── README.md            # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd user-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Access the application**
   - **Homepage**: http://localhost:5000
   - **Dashboard**: http://localhost:5000/index.html
   - **API Docs**: http://localhost:5000/api-docs
   - **API Base URL**: http://localhost:5000/api/users

## 📚 API Endpoints

### Base URL
```
http://localhost:5000/api/users
```

### 1. Get All Users
```http
GET /api/users?format=json
```

**Response:**
```json
{
  "success": true,
  "users": [
    {
      "id": 1,
      "name": "Aarav Sharma",
      "email": "aarav@gmail.com",
      "age": 25
    }
  ]
}
```

### 2. Get Single User
```http
GET /api/users/:id
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "name": "Aarav Sharma",
    "email": "aarav@gmail.com",
    "age": 25
  }
}
```

### 3. Create User
```http
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User created successfully",
  "user": {
    "id": 4,
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30
  }
}
```

### 4. Update User
```http
PUT /api/users/:id
Content-Type: application/json

{
  "name": "John Updated",
  "email": "john.updated@example.com",
  "age": 31
}
```

**Response:**
```json
{
  "success": true,
  "message": "User updated successfully",
  "user": {
    "id": 1,
    "name": "John Updated",
    "email": "john.updated@example.com",
    "age": 31
  }
}
```

### 5. Delete User
```http
DELETE /api/users/:id
```

**Response:**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

## 🔍 Error Responses

All error responses follow a consistent format:

```json
{
  "success": false,
  "message": "Error message here"
}
```

**Common HTTP Status Codes:**
- `400` - Bad Request (validation errors)
- `404` - Not Found (user doesn't exist)
- `409` - Conflict (email already exists)
- `500` - Internal Server Error

## 🧪 Testing with Postman

### Setup Steps:

1. **Open Postman** and create a new collection called "User API"

2. **Get All Users**
   - Method: `GET`
   - URL: `http://localhost:5000/api/users?format=json`
   - Headers: None required

3. **Get Single User**
   - Method: `GET`
   - URL: `http://localhost:5000/api/users/1`
   - Headers: None required

4. **Create User**
   - Method: `POST`
   - URL: `http://localhost:5000/api/users`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
     ```json
     {
       "name": "Test User",
       "email": "test@example.com",
       "age": 25
     }
     ```

5. **Update User**
   - Method: `PUT`
   - URL: `http://localhost:5000/api/users/1`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
     ```json
     {
       "name": "Updated Name",
       "age": 26
     }
     ```

6. **Delete User**
   - Method: `DELETE`
   - URL: `http://localhost:5000/api/users/1`
   - Headers: None required

## 🎨 Features in Detail

### Web Dashboard
- **Real-time Statistics**: View total users, average age, youngest, and oldest users
- **Search Functionality**: Search users by name, email, ID, or age
- **Add/Edit Users**: Beautiful modal forms for creating and editing users
- **Delete Users**: One-click deletion with confirmation
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Toast Notifications**: Beautiful notifications for all actions

### Data Validation
- **Email Validation**: Ensures valid email format
- **Age Validation**: Age must be between 1 and 120
- **Required Fields**: All fields are validated before processing
- **Duplicate Email Check**: Prevents duplicate email addresses
- **Input Sanitization**: Trims whitespace and normalizes data

### API Features
- **Consistent Responses**: All responses follow a standard format
- **Proper HTTP Status Codes**: Uses appropriate status codes for different scenarios
- **Error Handling**: Comprehensive error handling with meaningful messages
- **CORS Enabled**: Cross-origin requests are supported
- **Request Logging**: All requests are logged using Morgan middleware

## 🛠️ Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger
- **Bootstrap 5** - CSS framework
- **Font Awesome** - Icons
- **Vanilla JavaScript** - Frontend interactivity

## 📝 Skills Demonstrated

- ✅ Node.js Basics
- ✅ REST API Design
- ✅ Express Framework
- ✅ JSON Handling
- ✅ Postman Testing
- ✅ Data Validation
- ✅ Error Handling
- ✅ Frontend Development
- ✅ Responsive Design

## 🎯 Future Enhancements

Potential improvements for this project:
- Database integration (MongoDB, PostgreSQL)
- User authentication and authorization
- Pagination for large datasets
- Sorting and filtering options
- Export functionality (CSV, JSON)
- Unit and integration tests
- API rate limiting
- Swagger/OpenAPI documentation

## 👨‍💻 Author

**Vivek G L**

Full Stack Development Project

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Express.js community
- Bootstrap team
- Font Awesome for icons
- All contributors to the open-source ecosystem

---

**Made with ❤️ and ☕**

For questions or suggestions, feel free to reach out!

