var express = require('express');
var router = express.Router();
var config = require('../config');
var mysql = require('mysql');

router.post('/', function(req, res, next) {

	var email = req.body.email;

	var connection = mysql.createConnection({
		host: config.host,
		user: config.user,
		password: config.password,
		database: config.database,
		port: config.port
	})

	connection.query('SELECT * FROM users WHERE strEmail = (?)',
		[email], function(error, result) {

			if (error) {
				return res.render('error', {message: error});
			}

			else {
				if (result.length != 0) {
					res.send('invalid');
				}

				else {
					res.send('valid')
				}
			}
		})
})

module.exports = router;