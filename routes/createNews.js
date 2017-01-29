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

	//Create the conn
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

	var title = req.sanitize(req.body.title);
	var body = req.sanitize(req.body.body);
	var img = req.files.img;
	var imgUrl = uploadImg(img);

	var query = connection.query('INSERT INTO news (title, body, imgUrl) VALUES (?, ?, ?)'
		,[title, body, imgUrl]

		,function(error, result) {

			if (error) {
				console.log(error);
			}

			else {
				connection.end();
				res.redirect('/admin/news');
			}
		}

	);

	function uploadImg (img) {

		var fs = require('fs');
		var tmpPath = img.path; //File's path from our computer
		var name = img.name; //Files's name
		var uploadFolder = __dirname + '/../public/images/uploads/news/' + name; //Path in our server

		//Check if they're trying to upload images :)
		if (img.type.indexOf('image') == -1) {
			res.send('No has enviado una imagen, vuelve atrás y recarga')
		}

		else {

			//Upload the file
			fs.rename(tmpPath, uploadFolder, function(err) {

				if (err) {
					console.log(err);
				}

				else {
				}
			})

			return '/images/uploads/news/' + name;
		}	
	}

});

module.exports = router;