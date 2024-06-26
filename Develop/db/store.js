//takes info you type into notes and saves it to the database.

const fs = require("fs");
const path = require("path");


class Store {
    read() {
        return fs.readFileSync (path.resolve(__dirname, "db.json"), "utf8");
    }

    write(note) {
        let file = this.read();
        let notes = JSON.parse(file);
        notes.push(note);
        fs.writeFileSync(path.resolve(__dirname, "db.json"), JSON.stringify(notes));
    }

    removeNotes(id) {
        const notes = this.getNotes();
        const newNotes = notes.filter(note => note.id !== id);
        this.write(newNotes);
    }
}

module.exports = new Store();