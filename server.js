const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors'); // Colors for better log
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
// const cors = require('cors');

// Middleware import
const errorHandler = require('./middleware/error');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 429,
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
// app.use(cors);

// Rout files
const todos = require('./route/todos');
const auth = require('./route/auth');

// Mount routers
app.use('/api/v1/todos', todos);
app.use('/api/v1/auth', auth);

// Handle all error
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.rainbow
      .bold
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`unhandledRejection Error: ${err.message}`.red.inverse);
  // Close server & exit process
  server.close(() => process.exit(1));
});
