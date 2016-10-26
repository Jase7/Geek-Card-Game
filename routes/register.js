var express = require('express');
var mysql = require('mysql');
var hash = require("password-hash");
var bcrypt = require('bcrypt-nodejs');
var router = express.Router();

/* GET register page. */
router.get('/', function(req, res, next) {
  res.render('register', {});
});

module.exports = router;

/* POST register data */
router.post('/', function(req, res, next) {

	var connection = mysql.createConnection({
	   host: 'localhost',
	   user: 'root',
	   password: '',
	   database: 'geekcardgame',
	   port: 3306
	});

	connection.connect(function(error){

	   if(error){
	      console.log(error);
	   } else{
	      console.log('Conexion correcta.');
	   }
	});

	var user = req.body.user;
	var email = req.body.email;
	var pass = req.body.pass;
	var currentTime = new Date();
	var hashLogin = hash.generate(Math.random().toString(36).substring(50));

	bcrypt.hash(pass, null, null, function(err, hash) {

		var query = connection.query('INSERT INTO users (strUsername, strEmail, strPassword, datRegisterDate, strRegisterHash) VALUES(?, ?, ?, NOW(), ?)'
		, [user, email, hash, hashLogin]

		, function(error, result){
			   	if (error) {
			   		throw error;
			   	}

			   	else {

			    	res.redirect('/', {});
			   }
		}
	);

	connection.end(); 

	})
    	
});

	

	

module.exports = router;