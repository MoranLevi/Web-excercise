const sqlite3 = require('sqlite3');
const express = require("express");
const cors = require("cors");
var app = express();
app.use(express.json()) 
app.use(cors()); 

const port = 8000 || process.env.PORT;
app.listen(port, () => {
    console.log("Server is listening on port " + port);
});

const db = new sqlite3.Database('./emp_database.db', (err) => {
    if (err) {
        console.error("Error opening database " + err.message);
    } else {

        db.run('CREATE TABLE employees( \
            first_name NVARCHAR(20)  NOT NULL,\
            last_name NVARCHAR(20)  NOT NULL,\
            id NVARCHAR(20) PRIMARY KEY NOT NULL,\
            age NVARCHAR(5)\
        )', (err) => {
            if (err) {
                console.log("Table already exists.");
            }
            let insert = 'INSERT INTO employees (first_name, last_name, id, age) VALUES (?,?,?,?)';
            db.run(insert, ["Moran", "Levi", 206215139, 26]);
            db.run(insert, ["Almog", "Afrgan", 305292150, 29]);
            db.run(insert, ["Gupta", "Pinky", 302369852, 32]);
        });
    }
});

// get employee by id
app.get("/employees/:id", (req, res, next) => {
    console.log("enter to get employee");
    let params = [req.params.id]
    db.get(`SELECT * FROM employees where id = ?`, [req.params.id], (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.status(200).json(row);
      });
});

// get all the employees
app.get("/employees", (req, res, next) => {
    console.log("enter to get all employee");
    db.all("SELECT * FROM employees", [], (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.status(200).json({rows});
      });
});

// insert an employee
app.post("/employees", (req, res, next) => {
    console.log("enter to insert new employee");
    let reqBody = req.body;
    db.run(`INSERT INTO employees (first_name, last_name, id, age) VALUES (?,?,?,?)`,
        [reqBody.first_name, reqBody.last_name, reqBody.id, reqBody.age],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.status(201).json({
                "id": this.lastID
            })
        });
});

// update employee
app.patch("/employees", (req, res, next) => {
    console.log("enter to update employee");
    var reqBody = req.body;
    db.run(`UPDATE employees set first_name = ?, last_name = ?, age = ? WHERE id = ?`,
        [reqBody.first_name, reqBody.last_name, reqBody.age, reqBody.id],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.status(200).json({ updatedID: this.changes });
        });
});

// delete employee
app.delete("/employees/:id", (req, res, next) => {
    console.log("enter to delete employee");
    db.run(`DELETE FROM employees WHERE id = ?`,
        req.params.id,
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.status(200).json({ deletedID: this.changes })
        });
});



