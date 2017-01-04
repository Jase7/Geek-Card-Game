var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../config');

/* GET news page. */
router.get('/', function(req, res, next) {

	var connection = mysql.createConnection({
		host: config.hostname,
		user: config.user,
		password: config.pass,
		database: config.database,
		port: config.port
	});

	connection.connect(function(error) {

		if (error) {
			console.log(error);
		}
	})

	var query = connection.query('SELECT title, body, imgUrl FROM news'
		, function(error, result) {

			if (error) {
				console.log(error)
			}

			else {

				if (req.session.user) {

					res.render('news', {
						user: req.session.user
						, news: result
					});
				}	

				else if (req.cookies.user) {

					res.render('news', {
						user: req.cookies.user
						, news: result
					})
				}	

				else {
					res.redirect('/');
				}
			}
		}
	)




	
  		
});

module.exports = router;