const express = require('express');
const app = express();
const routes = require('./src/routes/index');

const PORT = process.env.PORT || 3000;

// Add the routes to the app
app.use('/', routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});