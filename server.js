// server.js
// where your node app starts
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const shortid = require("shortid");

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set('view engine', 'pug');
app.set("views", "./views");

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
// database
db.defaults({ books: [] }).write();
//
app.get('/', (req, res) => {
  res.render('home');
});

app.get("/books", (req, res) => {
  res.render( "index", {
    todo: db.get('books').value()
});
});  

app.get("/books/create",(req, res) => {
	res.render("create");
});
app.post("/books/create", (req, res) => {
  req.body.id = shortid.generate();
    db.get('books').push(req.body).write();
  
    res.redirect("/books");
  
});
// xóa tên sách
app.get("/books/:id/delete", function(req, res) {
 var id = req.params.id;
  db.get("books")
    .remove({ id: id })
    .write(); 
  
  res.render( "index", {
    todo: db.get('books').value()
  
  });
});

// cập nhật tên sách
app.get("/books/:id/update", function(req, res) {
  res.render("update");
});

app.post("/books/:id/update", (req, res) => {
  
  var id = req.params.id;
  var title = req.params.title;
   db.get('books')
  .find({ id: id })
  .assign({ title: title})
  .write()
  
  res.redirect("/books");
});