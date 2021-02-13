const fs = require("fs");
const path = require("path");

module.exports = (app) => {
    app.get("/api/notes", (req, res) => {
        res.sendFile(path.join(__dirname, "../db/db.json"));
    });

    app.post("/api/notes", (req, res) => {
        // Read the JSON file that holds any notes saved.
        fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
            if (err) throw(err);

            // Store the JSON data in an array variable.
            let notesArray = JSON.parse(data);
            // Save the new note from the request
            let newNote = req.body;
            let nextId = 1;

            // If nothing has been written to the JSON file, then start with an Id of 1.
            // Else get the largest number Id and add 1 for the new note's Id.
            if (notesArray.length > 0) {
                nextId = (Math.max(...(notesArray.map(note => note.id)))) + 1;
            };

            // Set the note's Id and add it to the notes array.
            newNote.id = nextId;
            notesArray.push(newNote);

            // Set the response to the updated array of notes.
            res.json(notesArray[notesArray.length - 1]);

            // Write the notes array to the JSON file to save the data.
            fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(notesArray));
        })
    });
};

