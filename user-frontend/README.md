# User Management System

A beautiful and modern Full Stack User Management Application built with React, Node.js, and MySQL. This application provides a complete CRUD (Create, Read, Update, Delete) interface for managing user profiles with a stunning UI and seamless backend integration.

## 🌟 Features

### Authentication
- **Secure Login System**: Username and password authentication
- **Session Management**: Login persists during browser session
- **Auto Logout**: Session clears when browser closes

### User Management
- **View Users**: Beautiful card-based layout displaying all users
- **Add Users**: Create new user profiles with validation
- **Edit Users**: Update existing user information
- **Delete Users**: Remove users with confirmation dialog
- **Real-time Updates**: Auto-refresh user list every 10 seconds

### UI/UX Features
- **Modern Design**: Glassmorphic design with gradient backgrounds
- **Dark/Light Theme**: Toggle between dark and light modes
- **Responsive Layout**: Works seamlessly on all devices
- **Smooth Animations**: Beautiful transitions and hover effects
- **Loading States**: Visual feedback during API calls
- **Error Handling**: User-friendly error messages

### Backend Integration
- **Connection Status**: Real-time backend connection indicator
- **RESTful API**: Full integration with MySQL backend
- **Error Handling**: Comprehensive error handling and logging

## 🚀 Tech Stack

### Frontend
- **React 19.2.0** - Modern UI library
- **React Router DOM 7.9.5** - Client-side routing
- **React Bootstrap 2.10.10** - UI components
- **Axios 1.13.2** - HTTP client
- **React Toastify 11.0.5** - Toast notifications
- **Bootstrap 5.3.8** - CSS framework

### Backend (Required)
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **MySQL** - Database
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MySQL** database
- **Backend server** running on `http://localhost:5000`

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd user-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   - Navigate to `http://localhost:3000`
   - The app will automatically open in your default browser

## 🔐 Login Credentials

- **Username**: `admin`
- **Password**: `12345`

## 📡 Backend Configuration

### API Endpoints

The application expects the following endpoints from your backend:

- `GET /api/users` - Fetch all users
- `GET /api/users/:id` - Fetch a single user
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

### Backend Setup

1. Ensure your backend server is running on `http://localhost:5000`
2. Enable CORS in your backend:
   ```javascript
   const cors = require('cors');
   app.use(cors());
   ```
3. The backend should return data in one of these formats:
   - Direct array: `[{...}, {...}]`
   - Object with users: `{users: [{...}]}`
   - Object with data: `{data: [{...}]}`

## 📁 Project Structure

```
user-frontend/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── AddUser.js       # Add user form component
│   │   ├── EditUser.js      # Edit user form component
│   │   ├── Login.js         # Login page component
│   │   └── UserList.js      # User list display component
│   ├── utils/
│   │   └── api.js           # API configuration and interceptors
│   ├── App.js               # Main application component
│   ├── App.css              # Application styles
│   ├── index.js             # Application entry point
│   └── index.css            # Global styles
├── package.json
└── README.md
```

## 🎨 Key Components

### Login Component
- Beautiful animated login page
- Form validation
- Session management

### UserList Component
- Card-based user display
- Real-time data fetching
- Delete functionality with confirmation

### AddUser Component
- Form validation
- Success/error handling
- Auto-redirect after submission

### EditUser Component
- Pre-filled form with user data
- Update functionality
- Error handling

## 🛠️ Available Scripts

### `npm start`
Runs the app in development mode at `http://localhost:3000`

### `npm run build`
Builds the app for production to the `build` folder

### `npm test`
Launches the test runner (if configured)

## 🎯 Features in Detail

### Backend Connection Status
- Real-time indicator showing backend connection status
- Updates every 5 seconds
- Green badge when connected, red when offline

### User Cards
- Beautiful card design with user avatars
- User information display
- Quick action buttons (Edit/Delete)

### Form Validation
- Required field validation
- Email format validation
- Age range validation (1-120)

### Error Handling
- Network error handling
- API error messages
- User-friendly error notifications

## 🎨 Styling

The application uses:
- **Custom CSS** with modern animations
- **Bootstrap** for responsive grid and components
- **Glassmorphism** design effects
- **Gradient backgrounds** with animations
- **Smooth transitions** throughout

## 🔒 Security Notes

- Login credentials are stored in sessionStorage (clears on browser close)
- All API calls are logged for debugging
- CORS must be enabled on the backend
- Consider implementing proper authentication tokens for production

## 🐛 Troubleshooting

### Backend Not Connecting
1. Ensure backend is running on `http://localhost:5000`
2. Check CORS configuration in backend
3. Verify API endpoints are correct
4. Check browser console for detailed error messages

### Users Not Loading
1. Check backend response format matches expected structure
2. Verify database connection
3. Check browser console for API errors
4. Ensure backend returns proper JSON format

### Login Issues
1. Clear browser sessionStorage
2. Verify credentials: `admin` / `12345`
3. Check browser console for errors

## 📝 Development Notes

- The app uses `sessionStorage` for login persistence
- API calls are centralized in `src/utils/api.js`
- All components use React Hooks
- Error handling is implemented throughout
- Loading states provide user feedback

## 🚀 Deployment

1. Build the production version:
   ```bash
   npm run build
   ```

2. The `build` folder contains optimized production files

3. Deploy the `build` folder to your hosting service

4. Update API base URL in `src/utils/api.js` for production:
   ```javascript
   baseURL: process.env.REACT_APP_API_URL || 'https://your-backend-url.com'
   ```

## 👨‍💻 Author

**Vivek G L**
- Full Stack Developer
- Crafting Excellence in Full Stack Development
- Building Modern Web Applications with Passion & Precision

## 📄 License

This project is part of a Full Stack Development learning project.

## 🙏 Acknowledgments

- React team for the amazing framework
- Bootstrap for UI components
- All open-source contributors

---

**Note**: This is a learning project demonstrating Full Stack Development skills with React, Node.js, and MySQL integration.
