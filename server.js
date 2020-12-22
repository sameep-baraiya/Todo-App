const express = require('express');
const app = express();
const dotenv = require('dotenv'); //
const morgan = require('morgan'); // Dev logging middleware
const colors = require('colors'); // Colors for better log

// Load env vars
dotenv.config({ path: './config/config.env' });

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Middleware import
const errorHandler = require('./middleware/error');

// Rout files
const todos = require('./route/todos');
const auth = require('./route/auth');

// Mount routers
app.use('/api/v1/todos', todos);
app.use('/api/v1/auth', auth);

// Handle all error
app.use(errorHandler);

const PORT = 5000;

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
