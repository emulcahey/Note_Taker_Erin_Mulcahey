var router = require('express').Router();
const fs = require("fs"); 
var express = require('express');
const path = require('path');
const store = require('../db/store');
const asyncHandler = require('express-async-handler');

exports.getNotes = asyncHandler(async (req, res, next) => {
  var notes = store.read();
  res.json(notes);
});

exports.addNote = (req, res, next) => {
  store.write(req.body);
  res.send("New Note Created Via Post Request");
};

router.get('/notes', (req, res) => {
  store.getNotes()
  .then(notes => {return res.json(notes)})
  .catch(err => res.status(500).json(err));
});

router.post('/notes', async (req, res) => {
  await store.addNotes(req.body)
  .then((note) => res.json(note))
  .catch(err => res.status(500).json(err));
});

router.delete('/notes/:id', (req, res) => {
  store.removeNotes(req.params.id)
  .then(() => res.json({ok: true}))
  .catch(err => res.status(500).json(err));
});

module.exports = router;


    // function getNotesFromDb() {
        // let data = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
        // console.log("data", data);
        // const html = fs.readFileSync(path.join(__dirname, '../public/notes.html'))
        // res.json({html: html.toString(), data: data});

        // }

// // Read users.json file 
// fs.readFile("db.json", function(err, data) { 
    
//     // Check for errors 
//     if (err) throw err; 

//     // Converting to JSON 
//     const notes = JSON.parse(data); 
//     console.log(notes); // Print notes 
// }); 

// app.get('/search', function (req, res) {
//     res.header("Content-Type",'application/json');
//     res.json(data.json);
//   })