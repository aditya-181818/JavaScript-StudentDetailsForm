require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect Database
db.connect((err) => {
    if (err) {
        console.log("Database Connection Failed");
    } else {
        console.log("Connected to MySQL Database");
    }
});

// API Route
app.post("/submit", (req, res) => {

    const { name, roll, course, year, cgpa } = req.body;

    const sql = `
        INSERT INTO students
        (student_name, roll_no, course, year, cgpa)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [name, roll, course, year, cgpa], (err, result) => {

        if (err) {
            console.log(err);
            res.send("Error inserting data");
        } else {
            res.send("Student data inserted successfully");
        }
    });
});

// Start Server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});