var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');

/* GET login page. */
router.get('/', function(req, res, next) {

	if (req.session.user) {
		res.redirect('/news');
	}

	else if (req.cookies.user) {

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

			   				//If cookies are enabled 
			   				if (remember == 'on') {

			   					//Create a cookie with the session of the user
			   					req.session.user = user;

			   					res.cookie('user', req.session.user, { expires: new Date(Date.now() + 90000 * 90000) })
				      			.redirect('/news');
			   				}
			   				
			   				else {
			   					req.session.user = user;
			   					res.redirect('/news')	
			   				}
			   			}
					});			   		
			   }
		}
	);

	connection.end(); 

});

module.exports = router;