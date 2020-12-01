var express = require("express");
var router = express.Router();
const shortid = require("shortid");
var db = require('../db');


// view home user
router.get("/",(req, res) => {
	var users = db.get('user').value();
	res.render("user", {
    	users
	});
});

// add new user
router.get("/add",(req, res) => {
	res.render("useradd");
});

router.post("/add", (req, res) => {
  req.body.id = shortid.generate();
    db.get('user')
      .push(req.body)
      .write();
  
    res.redirect("/user");
  
});
// xóa người thuê
router.get("/:id/delete",(req, res) => {
  var id = req.params.id;
  var getData =  db
     .get("user")
    .remove({ id: id })
    .write();

  res.redirect("/user")
  });
// show thông tin
router.get("/:id", (req, res)=> {
  var getId = req.params.id;
  var getData = db
    .get("user")
    .find({ id: getId })
    .value();

  res.render("usershow", {
    user: getData
  });
});

module.exports = router;