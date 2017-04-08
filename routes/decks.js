var express = require('express');
var router = express.Router();
var config = require('../config');
var mysql = require('mysql');

router.get('/', function(req, res, next) {

	
	var connection = mysql.createConnection({	
			host: config.host,
			user: config.user,
			password: config.password,
			database: config.database,
			port: config.port
		});

		connection.query('SELECT * FROM decks'
			,[]	
			, function(error, result) {

				if (error) {
					console.log(error)
				}

				else {
					res.json(result);					
				}		
		})

		connection.end();

})

module.exports = router;