const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors'); // Colors for better log
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

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
