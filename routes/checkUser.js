var express = require('express');
var router = express.Router();
var mysql = require('mysql');

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