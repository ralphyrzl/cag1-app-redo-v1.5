const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mysql = require("mysql");

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mymonies",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL connected...");
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  let sql = "SELECT * FROM transactions";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.render("index", { transactions: results });
  });
});

app.post("/add", (req, res) => {
  let newTransaction = {
    amount: req.body.amount,
    type: req.body.type,
    entity: req.body.entity,
    remarks: req.body.remarks,
    date: new Date(),
  };
  let sql = "INSERT INTO transactions SET ?";
  db.query(sql, newTransaction, (err, result) => {
    if (err) throw err;
    res.redirect("/");
  });
});

app.post("/delete/:id", (req, res) => {
  let sql = "DELETE FROM transactions WHERE id = ?";
  let id = req.params.id;
  //console.log(id);

  db.query(sql, id, (err, result) => {
    if (err) throw err;
    res.redirect("/");
  });
});

app.post("/update/:id", (req, res) => {
  let sql = "UPDATE transactions SET amount = ?, remarks = ? WHERE id = ?";
  let data = [req.body.amount, req.body.remarks, req.params.id];
  db.query(sql, data, (err, result) => {
    if (err) throw err;
    res.redirect("/");
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
