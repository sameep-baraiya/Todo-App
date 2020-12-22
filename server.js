const express = require('express');
const app = express();

// Middleware import
const errorHandler = require('./middleware/error');

// Rout files
const todos = require('./route/todos');

// Mount routers
app.use('/api/v1/', todos);

// Handle all error
app.use(errorHandler);

const PORT = 5000;

app.listen(PORT, console.log(`Server is runnig on PORT ${PORT}`));
