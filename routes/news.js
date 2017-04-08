var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var sanitizer = require('sanitizer');
var config = require('../config');
var mysql = require('mysql');
var functions = require('../functions');

/* GET news page. */
router.get('/', function(req, res, next) {

	//Let's pass the news to the view
	functions.getNews(function(news) {

		res.render('news', { news: news });	
						
	})
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
					var bodyNew = sanitizer.unescapeEntities(noticia.body);
					
					res.render('loadNew', { loadedNew: noticia
											, cuerpo: bodyNew });
				}

				else {
					res.render('error', { message: "Not found"});
				}
			}
		});

	connection.end();
});

module.exports = router;