const express = require('express')
const app = express()
const port = 3000
const router = express.Router()

app.use(express.static('public'));

app.get('/', (req, res) => res.render('index.html'));

app.get('/notes', (req, res) => {
    res.sendFile(__dirname + '/public/notes.html')
});

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const notesRoutes = require('./Routes/api.js');

// Use routes
app.use('/notes', notesRoutes);

// Start the server
app.listen(port, () => console.log(`Example app listening on port ${port}!`) );