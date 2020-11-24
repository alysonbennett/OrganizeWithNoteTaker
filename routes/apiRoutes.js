//Required modules
// const notesData = require("../db/db.json");
const fs = require("fs");
const path = require("path");
const DB_PATH = path.join(__dirname, '../db/db.json');

// const writeFile = (path, data) => fs.writeFileSync(path, JSON.stringify(data))
// const readFile = (path, enc) => JSON.parse(fs.readFileSync(path, enc))

// const writeDB = data => writeFile(DB_PATH, data)
// const readDB = () => readFile(DB_PATH, "utf8")

const __DB__ = "../db/db.json";
class DB {
    constructor(dir) {
        this.dir = path.join(__dirname, dir);
        this.data = this.readDB();
    }

    writeFile(path, data) { fs.writeFileSync(path, JSON.stringify(data)) }
    readFile(path, enc) { return JSON.parse(fs.readFileSync(path, enc)) }

    writeDB(data) { this.writeFile(this.dir, data) }
    readDB() { return this.readFile(this.dir, "utf8") }

    add(item) {
        item.id = 1;

        this.data.push(item)
        this.writeDB(this.data)
    }

    findAll() {
        return this.data
    }
}

//Routing
module.exports = function (app) {

    //API GET Request, displays all notes
    app.get("/api/notes", function (req, res) {
        // const notesData = readDB();

        res.json(new DB(__DB__).findAll());
    });

    //Create new notes
    app.post("/api/notes", function (req, res) {
        // const notesData = readDB();
        // notesData.push(req.body);
        // writeDB(notesData);

        new DB(__DB__).add(req.body)

        res.sendStatus(200);
    })
}
