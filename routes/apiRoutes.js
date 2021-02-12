const fs = require('fs');

app.get('/api/notes', (req, res) => res.json(db));

const init = () => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            let notes = JSON.parse(data);
            console.log(notes);
        }
    })
}

module.exports = route;
