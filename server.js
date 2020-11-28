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
  
 // res.render( "index", {
   // todo: db.get('books').value()
    res.redirect("/books");
  });


// cập nhật tên sách
app.get("/books/:id/update", function(req, res) {
   var getId = req.params.id;
  var getData = db
    .get("books")
    .find({ id: getId })
    .value();
  res.render("books", {
    todo: getData
  });
});

app.post("/books/:id/update", (req, res) => {
  
  var id = req.params.id;
  var getTitle = req.body.title;
  var getDes  = req.body.des;
   
   db.get('books')
  .find({ id: id })
  .assign({ title: getTitle})
  .write()
  

  res.render( "index", {
    todo: db.get('books').value()
  });
});