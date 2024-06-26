var router = require('express').Router();
const fs = require("fs"); 
var express = require('express');
const path = require('path');
const store = require('../db/store');
// const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

exports.getNotes = (req, res, next) => {
  var notes = store.read();
  res.json(notes);
};

addNote = (req, res, next) => {
  store.write(req.body);
  res.send("New Note Created Via Post Request");
};

router.get('/notes', (req, res) => {
  const notes = store.read();
  res.json(JSON.parse(notes));
});

router.post('/notes', jsonParser, 
  addNote
);

router.delete('/notes/:id', (req, res) => {
  store.removeNotes(req.params.id)
  .then(() => res.json({ok: true}))
  .catch(err => res.status(500).json(err));
});

module.exports = router;