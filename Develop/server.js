const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const path = require('path');

// Import routes
const notesRoutes = require('./Routes/api');
const htmlRoutes = require('./Routes/htmlRoute');

//,{index:false,extensions:['html']}

// app.get('/', (req, res) => res.render('index.html'));

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// Use routes

app.use('/api', notesRoutes);
app.use('/', htmlRoutes);

// Start the server
app.listen(port, () => console.log(`App listening on port ${port}!`) );