const fs = require("fs");
const path = require("path");

//let notes = require("../db/db.json");
let notes = [];

module.exports = (app) => {
    //app.get("/api/notes", (req, res) => res.json(notes));
    app.get("/api/notes", (req, res) => {
        res.sendFile(path.join(__dirname, "../db/db.json"));
    });

    app.post("/api/notes", (req, res) => {
        fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
            if (err) throw(err);

            let dbJSON = JSON.parse(data);
            let newNote = req.body;

            dbJSON.forEach(note => {
                notes.push(note);
            });
        })
    });
};

function init () {


}
