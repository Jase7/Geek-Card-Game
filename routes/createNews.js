var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../config');

/* GET news page. */
router.get('/', function(req, res, next) {

	if (req.session.user) {

		res.render('createNews', {
			user: req.session.user
		});
	}	

	else if (req.cookies.user) {

		res.render('createNews', {
			user: req.cookies.user
		})
	}	

	else {
		res.redirect('/');
	}
  		
});

/* POST news */

router.post('/', function(req, res, next) {

	//Create the con
	var connection = mysql.createConnection({
		host: config.hostname,
		user: config.user,
		password: config.pass,
		database: config.database,
		port: config.port
	});

	//Let's connect
	connection.connect(function(error){

	   if (error) {

	      console.log(error);
	   } 

	   else {
	      console.log('Conexion correcta.');
	   }
	});

	var title = req.body.title;
	var body = req.body.body;

	var query = connection.query('INSERT INTO news (title, body) VALUES (?, ?)'
		,[title, body]

		,function(error, result) {

			if (error) {
				console.log(error);
			}

			else {
				res.redirect('/admin/news');
			}
		}

		);



});

module.exports = router;