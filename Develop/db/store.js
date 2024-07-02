//takes info you type into notes and saves it to the database.
const fs = require("fs");
const path = require("path");
// const uuid = require("uuid");
const { v4: uuidv4 } = require('uuid');
const util = require("util");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);



class Store {
    async read() {
        // console.log("read")
        // return fs.readFileSync (path.resolve(__dirname, "db.json"), "utf8");
        return await readFileAsync("db/db.json", "utf8");
    }

    write(note) {   
        // let file = this.read();
        // let notes = JSON.parse(file);
        // notes.push(note);
        // fs.writeFileSync(path.resolve(__dirname, "db.json"), JSON.stringify(notes));
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
            //console.log("parsedNotes: ", parsedNotes)
            return parsedNotes;
        });
    }

    removeNotes(id) {
        const notes = this.getNotes();
        const newNotes = notes.filter(note => note.id !== id);
        this.write(newNotes);
    }

    // addNote = (req, res, next) => {
    //     store.write(req.body);
    //     res.send("New Note Created Via Post Request");
    //   };

    addNote(note){
        console.log("note", note)
        const { title, text } = note;
        if (!title || !text) {
            throw new Error("Note 'title' and 'text' cannot be blank");
        }
        const newNote = { title, text, id: uuidv4() };
        console.log("newnote", newNote )
        // const notes = await this.getNotes()
        // console.log("notes", this.getNotes())
        // notes.push(newNote)
        // //aray
        // await this.write(notes)
        // return newNote;

        return this.getNotes()
            .then((notes) => [...notes, newNote])
            .then((updatedNotes) => this.write(updatedNotes))
            .then(() => newNote);
            // return myNotes;
    };


}

module.exports = new Store();