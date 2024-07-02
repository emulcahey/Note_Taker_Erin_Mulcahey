const router = require('express').Router();
const fs = require("fs"); 
var express = require('express');
const path = require('path');
const store = require('../db/store');
// const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

// exports.getNotes = (req, res, next) => {
//   var notes = store.read();
//   res.json(notes);
// };

// addNote = (req, res, next) => {
//   store.write(req.body);
//   res.send("New Note Created Via Post Request");
// };

router.get('/notes', (req, res) => {
  // const notes = store.read();
  // res.json(JSON.parse(notes));
  console.log("get notes")
   store.getNotes()
  .then((notes) => {
    res.json(notes);
    })
  .catch((err) => res.status(500).json(err));
});

router.post('/notes', (req, res) => { 
  // console.log("checking this post notes logs...", req.body)
  store.addNote(req.body)
  .then((note) => res.json(note))
  .catch(err => res.status(500).json(err));
});

router.delete('/notes/:id', (req, res) => {
  store.removeNotes(req.params.id)
  .then(() => res.json({ok: true}))
  .catch(err => res.status(500).json(err));
});

module.exports = router;