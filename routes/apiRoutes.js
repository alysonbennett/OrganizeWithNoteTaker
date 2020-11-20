//Required modules
const fs = require("fs");
const notesData = require("..db/db.json");

//Routing
module.exports = function(app) {

    //API GET Request, displays all notes
    app.get("/api/notes", function (req, res) {
        res.json(notesData);
    });

    //Create new notes
    app.post("/api/notes", function(req, res) {
        
    })
}