//takes info you type into notes and saves it to the database.
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const util = require("util");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    async read() {

        return await readFileAsync("db/db.json", "utf8");
    }

    write(note) {   
        return writeFileAsync("db/db.json", JSON.stringify(note));
    }

    async getNotes() {
        return await this.read().then(async (notes) => {
            let parsedNotes;
            try {
                parsedNotes = await [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }
            return parsedNotes;
        });
    }

    async removeNotes(id) {
        const notes = await this.getNotes();
        const newNotes = notes.filter(note => note.id !== id);
        this.write(newNotes);
    }

    addNote(note){
        const { title, text } = note;
        if (!title || !text) {
            throw new Error("Note 'title' and 'text' cannot be blank");
        }
        const newNote = { title, text, id: uuidv4() };

        return this.getNotes()
            .then((notes) => [...notes, newNote])
            .then((updatedNotes) => this.write(updatedNotes))
            .then(() => newNote);
            // return myNotes;
    };
}

module.exports = new Store();