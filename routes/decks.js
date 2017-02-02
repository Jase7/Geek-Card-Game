var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var config = require('../config');

router.get('/:id', function(req, res, next) {

	//Create conn
	var connection = mysql.createConnection({
		host: config.host,
		user: config.user,
		password: config.password,
		database: config.database,
		port: config.port
	});

	//Test the conn
	connection.connect(function(err) {

		if (err) {
			console.log(err)
		}
	});

	//Save the id from the url
	var idDeck = req.params.id;

	//Query
	var query = connection.query('SELECT * FROM cardsdeck WHERE codDeck = (?)'
		, [idDeck]

		, function(err, result) {

			if (err) {
				console.log(err);
			}

			else {
				connection.end();
				res.json(result);
			}
		});
});

module.exports = router;