// const fs = require('fs');
const htmlRoutes = require('./routes/htmlRoutes');

// express
const { response } = require("express");
const express = require("express");

// setup the server (app)
const app = express();

// setup a port
const PORT = process.env.PORT || 4500;

app.use(express.static("public"));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", htmlRoutes);

// GET /api/reservations - gives back an array of reservations
//app.get("/api/notes", (req, res) => res.json(notes));

// GET /api/waitlist - gives back waitlisted reservations
//app.get("/*", (req, res) => res.json(index));
// app.get("/notes", (req, res) => {
//     res.sendFile(path.join(__dirname, "public/notes.html"));
// });

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));