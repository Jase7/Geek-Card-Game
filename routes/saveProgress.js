var express = require('express');
var router = express.Router();
var config = require('../config');
var mysql = require('mysql');


router.get('/', function(req, res, next) {

	var codUser = req.cookies['codUser'] || req.session.codUser;

	var connection = mysql.createConnection({
		host: config.host,
		user: config.user,
		password: config.password,
		port: config.port,
		database: config.database
	})

	connection.query('SELECT u.strUsername as name, '+
						'p.maxLevel as maxLevel, ' + 
						'p.cennitPoints as cennitPoints ' +
						'FROM progress p ' + 
						'INNER JOIN users u ' + 
						'ON p.codUser = u.id ' +
						'WHERE p.codUser = (?)'
		,[codUser] ,function(error, result) {
			if(error) {
				console.log(error)
			}
			else {
				console.log(result)
				res.json(result)
			}
		})

	connection.end();
})


router.post('/:arg0/:arg1/:arg2/:arg3', function(req, res, next){

	var codUser = req.cookies["codUser"] || req.session.codUser;
	var seed = req.params.arg0;
	var status = req.params.arg1;
	var points = req.params.arg2;
	var intTurns = req.params.arg3;

	var connection = mysql.createConnection({

		host: config.host,
		user: config.user,
		password: config.password,
		database: config.database,
		port: config.port
	})

	//Create new register of plays
	connection.query("INSERT INTO history (codUser, intSeed, blnVictory, cennitPoints, intTurns) VALUES (?, ?, ?, ?, ?)"
		,[codUser, seed, status, points, intTurns]
		, function(error, result) {

			if (error) {
				console.log(error)
				res.send(error)
			}

			else {
				res.send(result)
			}
		})

			//Update progress
			if (seed > 0) {

				connection.query('UPDATE progress SET maxLevel = (?), cennitPoints = (SELECT SUM(cennitPoints) FROM history WHERE codUser = (?)) WHERE codUser = (?)'
					,[seed, codUser, codUser]), function(error, result) {

					if (error) {
						console.log(error)
						res.send(error)
					}
				}	
			}

			// else if (seed <= 0) {

			// 	connection.query('UPDATE progress SET maxLevel = (?), cennitPoints = (SELECT SUM(points) FROM history WHERE codUser = (?)) WHERE codUser = (?)'
			// 		, [seed, codUser, codUser], function(error, result) {

			// 			if (error) {
			// 				console.log(error)
			// 				res.send(error)
			// 			}
			// 	})
			// }

	connection.end()
	
}) 

module.exports = router;
