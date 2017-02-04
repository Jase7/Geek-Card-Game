var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../config');

/* GET news page. */
router.get('/', function(req, res, next) {

	//If the cookies are setted
	if (req.cookies['user'] && req.cookies['is_admin'] && req.cookies['userID_']) {

		//Handling the cookie is the correct 
		getSessionID(req.cookies['user'], function(result) {

			var sesion = result;

			//If it's the same, you have access to the page
			if (req.cookies['userID_'] == sesion) {

				//Let's pass the news to the view
				getNews(function(news) {

					res.render('news', { news: news });					
				})
			}

			//If doesn't you have to log in again
			else {
				res.redirect('/');
			}
		});	

	} 

	//There aren't no cookies but there are ssessions
	else if (req.session.user && req.session.admin && req.session.userID) {

		//Let's pass the news to the view
		getNews(function(news) {

			res.render('news', { news: news });					
		})
	}

	//You're not logged in
	else {
		res.redirect('/');
	}

	

	function getSessionID(user, callback) {

		var connection = mysql.createConnection({
			host: config.host,
			user: config.user,
			password: config.password,
			database: config.database,
			port: config.port
		});

		connection.query('SELECT is_active FROM users WHERE strUsername = (?)'
			,[user] , function(error, result) {

				if (error) {
					console.log(error)
				}

				else {

					if (result.length == 1) {

						var resultado = result[0].is_active

						connection.end();
						callback(resultado);
					}
				}
			})
		} //end getSessionID

	function getNews(callback) {

		var connection = mysql.createConnection({
			host: config.host,
			user: config.user,
			password: config.password,
			database: config.database,
			port: config.port
		});

		connection.query('SELECT * FROM news'

			, function(error, result) {

				if (error) {
					console.log(error)
				}

				else {
					
					connection.end();
					callback(result);
				}
			})
	} //end getNews

});

router.get('/:id', function(req, res, next) {

	var connection = mysql.createConnection( {

		host: config.host
		, user: config.user
		, password: config.password
		, database: config.database
		, port: config.port
	});

	var query = connection.query('SELECT * FROM news WHERE srcUrl = (?)'
		, [req.params.id]

		, function(error, result) {

			if (error) {
				console.log(error);
				res.render('error', { message: error});
			}

			else {
				if (result.length > 0) {

					var noticia = result[0];
					res.render('loadNew', { loadedNew: noticia });
				}

				else {
					res.render('error', { message: "Not found"});
				}
			}
		});

	connection.end();
});

module.exports = router;