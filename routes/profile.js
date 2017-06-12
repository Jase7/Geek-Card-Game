var express = require('express');
var router = express.Router();
var config = require('../config');
var mysql = require('mysql');

/* GET profile page. */
router.get('/', function(req, res) {

	//Sacamos el usuario 
	var codUser = req.session.codUser || req.cookies['codUser'];

	var connection = mysql.createConnection({	
		host: config.host,
		user: config.user,
		password: config.password,
		database: config.database,
		port: config.port
	});
	
	connection.query('SELECT intSeed, intTurns, cennitPoints, blnVictory FROM history WHERE codUser = (?) LIMIT 5;'
	 	,[codUser], function(error, result) {

	 		if (error) {
	 			console.log(error)
	 			res.render('error', {message: error})
	 		} 
	 		else {
	 			console.log(result)
	 			res.render('profile', { stats: result }) 
	 		}
	})

	connection.end()
})

module.exports = router;