const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

// Import routes
const notesRoutes = require('./Routes/api.js');
const htmlRoutes = require('./Routes/htmlRoute.js');

app.use(express.static('public'));
//,{index:false,extensions:['html']}

// app.get('/', (req, res) => res.render('index.html'));

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
// app.use('/notes', notesRoutes);
app.use('/', htmlRoutes);
app.use('/api', notesRoutes);

// Start the server
app.listen(port, () => console.log(`Example app listening on port ${port}!`) );