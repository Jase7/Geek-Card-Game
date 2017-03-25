var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../config');

/* POST login page. */
router.post('/', function(req, res, next) {
  
	var connection = mysql.createConnection({
		host: config.host,
		user: config.user,
		password: config.password,
		database: config.database,
		port: config.port
	});

	var user = req.body.user;

	var query = connection.query('SELECT * FROM users WHERE strUsername = (?)'
		, [user]

		, function(error, result){
			   	if (error) {
			   		throw error;
			   	}

			   	else {

			    	if (result.length > 0) {	    		

				        res.send("invalid");
			    	}

			    	else {		    		

			    		res.send("valid");
			    	}
			   }
		}
	);

	connection.end(); 


});

module.exports = router;