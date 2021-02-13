// Required packages
const fs = require("fs");
const path = require("path");

module.exports = (app) => {
    // Route to get all notes in JSON file
    app.get("/api/notes", (req, res) => {
        res.sendFile(path.join(__dirname, "../db/db.json"));
    });

    // Route to Post a new note data entered
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
            res.json(newNote);

            // Write the notes array to the JSON file to save the data.
            fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(notesArray));
        })
    });

    // Route to delete note by Id
    app.delete("/api/notes/:id", (req, res) => {
        // Read the JSON file that holds any notes saved.
        let notesArray = fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8", (err) => {throw(err)});

        // Store the JSON data in an array variable.
        notesArray = JSON.parse(notesArray);
        let remainingNotes = notesArray.filter(note => note.id !== parseInt(req.params.id));

        // Write the notes array to the JSON file to save the data.
        fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(remainingNotes), (err) => {throw (err)});
    
        // Respond with the remaining notes.
        res.json(remainingNotes);
    });
};

