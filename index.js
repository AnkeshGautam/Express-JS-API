const express = require('express');
const path = require('path');
const app = express();
const logger = require('./middleware/logger')

const PORT = process.env.PORT || 5000;

//Body Parser Middleware
app.use(express.json());

//API Members route
app.use('/api/members', require('./routes/api/members'));

//Init Middleware
app.use(logger);

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log("Server Started on " + PORT));