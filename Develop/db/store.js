//takes info you type into notes and saves it to the database.

const fs = require("fs");
const path = require("path");


class Store {
    async read() {
        console.log("read");
        return await fs.readFile (path.join(__dirname, "db.json"), "utf8");
    }

    async write(note) {
        console.log("write");
        return await fs.writeFile(path.join(__dirname, "db.json"), JSON.stringify(note));
    }

    async getNotes() {
        console.log("getNotes");
        return await this.read();
    }

    async addNotes(note) {
        console.log("addNotes new note:", note);
        const notes = await this.getNotes()
        // await notes.push(note);
        await this.write(notes);
    }

    removeNotes(id) {
        const notes = this.getNotes();
        const newNotes = notes.filter(note => note.id !== id);
        this.write(newNotes);
    }
}

module.exports = new Store();