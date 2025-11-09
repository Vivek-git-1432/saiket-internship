console.log("🟢 Starting server...");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// API Routes
app.use("/api/users", userRoutes);

// API Documentation Route
app.get("/api-docs", (req, res) => {
  res.sendFile(__dirname + "/public/api-docs.html");
});

// Root homepage - Beautiful landing page
app.get("/", (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>User REST API | Vivek G L</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" />
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          margin: 0;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
          color: #fff;
          transition: background 0.5s, color 0.5s;
          position: relative;
          overflow: hidden;
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .card {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 25px;
          padding: 50px;
          text-align: center;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: fadeIn 1s ease;
          max-width: 600px;
          width: 90%;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        h1 {
          font-weight: 800;
          font-size: 3rem;
          margin-bottom: 15px;
          text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
        }
        p {
          opacity: 0.95;
          margin-bottom: 30px;
          font-size: 1.1rem;
        }
        .btn-group {
          display: flex;
          gap: 15px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .btn-custom {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: #fff;
          font-weight: 600;
          padding: 15px 30px;
          border-radius: 50px;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }
        .btn-custom:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.35);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.3);
          color: #fff;
        }
        .btn-primary-custom {
          background: linear-gradient(135deg, #667eea, #764ba2);
          border: none;
        }
        .btn-primary-custom:hover {
          background: linear-gradient(135deg, #764ba2, #667eea);
        }
        footer {
          position: absolute;
          bottom: 20px;
          font-size: 0.9rem;
          opacity: 0.9;
          text-align: center;
          width: 100%;
        }
        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 20px;
          margin-top: 40px;
        }
        .feature-item {
          background: rgba(255, 255, 255, 0.1);
          padding: 20px;
          border-radius: 15px;
          backdrop-filter: blur(10px);
        }
        .feature-item i {
          font-size: 2rem;
          margin-bottom: 10px;
        }
        .feature-item h5 {
          font-size: 0.9rem;
          font-weight: 600;
        }
        @media (max-width: 768px) {
          h1 { font-size: 2rem; }
          .card { padding: 30px 20px; }
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h1><i class="fas fa-rocket me-2"></i>User REST API</h1>
        <p>Designed & Developed by <strong>Vivek G L</strong></p>
        <div class="btn-group">
          <a href="/index.html" class="btn btn-primary-custom btn-custom">
            <i class="fas fa-dashboard"></i> Dashboard
          </a>
          <a href="/api-docs" class="btn btn-custom">
            <i class="fas fa-book"></i> API Docs
          </a>
        </div>
        <div class="features">
          <div class="feature-item">
            <i class="fas fa-database"></i>
            <h5>CRUD Operations</h5>
          </div>
          <div class="feature-item">
            <i class="fas fa-shield-alt"></i>
            <h5>Data Validation</h5>
          </div>
          <div class="feature-item">
            <i class="fas fa-mobile-alt"></i>
            <h5>Responsive UI</h5>
          </div>
          <div class="feature-item">
            <i class="fas fa-code"></i>
            <h5>RESTful API</h5>
          </div>
        </div>
      </div>
      <footer>© ${new Date().getFullYear()} Vivek G L | Full Stack Development Project</footer>
    </body>
  </html>
  `);
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found. Please check the API documentation at /api-docs"
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n✅ Server is running!`);
  console.log(`📍 Local:   http://localhost:${PORT}`);
  console.log(`📊 Dashboard: http://localhost:${PORT}/index.html`);
  console.log(`📚 API Docs:  http://localhost:${PORT}/api-docs`);
  console.log(`\n🚀 Ready to accept requests!\n`);
});
