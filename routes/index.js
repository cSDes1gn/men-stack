var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World Page*/
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello World' });
});

/* GET Userlist page. */
router.get('/userlist', function(req,res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({}, {}, function(e,docs) {
        res.render('userlist', {
            "userlist": docs
        });
    });
});

/* GET New User page. */
router.get('/newuser', function(req,res) {
    res.render('newuser', { title: "Add New User" });
});

/* POST to Add User Service */
router.post('/adduser', function(req,res){
    // set our internal db var
    var db = req.db;
    
    // get our form values (using name attr)
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // set collection
    var collection = db.get('usercollection');

    // submit to db
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function(err, doc) {
        if (err) {
            // return error response
            res.send("There was a problem adding the requested entries to the database.");
        } else {
            // forward success back to userlist
            res.redirect("userlist")
        }
    });
});


module.exports = router;
