//Dependencies
const path = require("path");

//Routing
module.exports = function(app) {
    //Route to notes page
    app.get("/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    //Route to index page
    app.get("*", function (req, rest) {
        rest.sendFile(path.join(__dirname, "../public/index.html"));
    });

};