// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
const cors = require('cors');

/* Middleware */
// Assume you have installed a package amazing.js from the terminal, and included it in your project using require() under the name amazing. Assuming you have an instance of an express app running with the name app, what line of code would you write to connect the app to the 'amazing.js' package?

// Configuring express to use body-parser as middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Using Cors for cross-origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
const port = 3000;
// const server = app.listen(port, listening(callback function))
const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Initialize all route with a callback function
// GET route to return projectData
app.get('/all', (req, res) => {
  res.send(projectData);
});

// POST route to add data to projectData
app.post('/add', (req, res) => {
  const { temperature, date, userResponse , name } = req.body;
  projectData = { temperature, date, userResponse , name };
  res.send({ success: true ,projectData });
});
