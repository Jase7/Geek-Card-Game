var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', {});
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

	var query = connection.query('SELECT * FROM users WHERE strUsername = (?) AND strPassword = (?)'
		, [user, pass]

		, function(error, result){
			   	if (error) {
			   		throw error;
			   	}

			   	else {
			   		
			    	if (result.length > 0) {

			    		req.session.user = req.body.user;

			      			
				      	res.cookie('user', req.session.user, { expires: new Date(Date.now() + 90000 * 90000) })
				      	.render('login', {
				      		user: req.session.user
				      	})
			    	}

			    	else {
			    		res.render('login', {
			    			user: undefined
			    		})
			    	}
			   }
		}
	);

	connection.end(); 


});

module.exports = router;