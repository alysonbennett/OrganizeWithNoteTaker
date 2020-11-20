//Required modules
const fs = require("fs");
const notesData = require("..db/db.json");

//Routing
module.exports = function(app) {

    //API GET Requests
    app.get("/api/notes", function (req, res) {
        res.json(notesData);
    });

}