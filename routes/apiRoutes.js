const fs = require("fs");
const path = require("path");

module.exports = (app) => {
    app.get("/api/notes", (req, res) => {
        res.sendFile(path.join(__dirname, "../db/db.json"));
    });

    app.post("/api/notes", (req, res) => {
        fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
            if (err) throw(err);

            let notesArray = JSON.parse(data);
            let newNote = req.body;
            let nextId = 1;

            if (notesArray.length > 0) {
                nextId = (Math.max(...(notesArray.map(note => note.id)))) + 1;
            };

            newNote.id = nextId;
            notesArray.push(newNote);
            res.json(notesArray[notesArray.length - 1]);

            fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(notesArray));
        })
    });
};

