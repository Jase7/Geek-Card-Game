var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');

/* GET login page. */
router.get('/', function(req, res, next) {

	if (!req.session.user) {
		res.redirect('/news');
	}

	else {
		res.render('login', {});
	}
  		
});

/* POST login page. */
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
	      throw error;
	   } else{
	      console.log('Conexion correcta.');
	   }
	});

	var user = req.body.user;
	var pass = req.body.pass;
	var remember = req.body.remember;

	//Save password
	var query = connection.query('SELECT * FROM users WHERE strUsername = (?)'
		, [user]

		, function(error, result, fields){
			   	if (error) {
			   		throw error;
			   	}

			   	else {

			   		var hash = result[0].strPassword;

			   		bcrypt.compare(pass, hash, function(err, resp) {

			   			if (err) {
			   				console.log(err);
			   			}

			   			if (resp) {
			   				req.session.user = user;
			   				res.render('news', {user: req.session.user})	
			   			}
					});			   		
			   }
		}
	);

	connection.end(); 

});

module.exports = router;