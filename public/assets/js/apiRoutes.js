// GET /api/reservations - gives back an array of reservations
app.get("/api/reservations", (req, res) => res.json(reservations));

// GET /api/waitlist - gives back waitlisted reservations
app.get("/api/waitlist", (req, res) => res.json(waitList));