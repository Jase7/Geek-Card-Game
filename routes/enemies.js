var express = require('express');
var router = express.Router();
var config = require('../config');
var mysql = require('mysql');

router.get('/:level', function(req, res, next) {

	var level = req.params.level;

	var connection = mysql.createConnection({	
			host: config.host,
			user: config.user,
			password: config.password,
			database: config.database,
			port: config.port
		});

		connection.query('SELECT * FROM enemy WHERE levelFor = (?)'
			,[level] , function(error, result) {

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