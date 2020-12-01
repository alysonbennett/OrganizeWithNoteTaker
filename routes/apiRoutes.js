//Required modules
const fs = require("fs");
const path = require("path");

//Build class for DB to use constructor
class DB {
    constructor() {
        const __DB__ = "../db/db.json";
        this.dir = path.join(__dirname, __DB__);
        this.data = this.readDB();
    }

    //Function to write notes to db
    writeDB() {
        fs.writeFileSync(this.dir, JSON.stringify(this.data))
    }

    //Function to read notes in DB
    readDB() {
        return JSON.parse(fs.readFileSync(this.dir, "utf8")) || []
    }

    //Function to add notes to db
    add(item) {
        if (this.data.length)
            item.id = this.data[this.data.length - 1].id + 1
        else
            item.id = 1

        this.data.push(item)
        this.writeDB()
    }

    //Function to display notes
    findAll() {
        return this.data
    }

    //Function to delete notes
    deleteById(id) {
        if (typeof id !== "number" && !isNaN(id))
            id = parseInt(id);
        this.data = this.data.filter(n => n.id !== id)
        this.writeDB()
    }
}

//Routing
module.exports = function (app) {

    //API GET Request, displays all notes
    app.get("/api/notes", function (req, res) {
        res.json(new DB().findAll());
    });

    //Create new notes
    app.post("/api/notes", function (req, res) {
        new DB().add(req.body)

        res.sendStatus(200);
    })

    //Delete note by ID
    app.delete("/api/notes/:id", function (req, res) {
        new DB().deleteById(req.params.id)

        res.sendStatus(200);
    })
}