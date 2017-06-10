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

	connection.query('SELECT u.strUsername as name,'+
						'p.maxLevel as maxLevel, ' + 
						'p.cennitPoints as cennitPoints' +
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

	var level = req.params.arg0;
	var seed = req.params.arg1;
	var status = req.params.arg2;
	var points = req.params.arg3;
	var codUser = req.cookies['codUser'] || req.session.codUser;

	var connection = mysql.createConnection({

		host: config.host,
		user: config.user,
		password: config.password,
		database: config.database,
		port: config.port
	})

	//Create new register of plays
	connection.query('INSERT INTO history (codUser, levelSeed, blnVictory, points) VALUES (?, ?, ?, ?)'
		,[codUser, seed, status, points]
		, function(error, result) {

			if (error) {
				console.log(error)
				res.send(error)
			}
		})

	//Update progress
	if (level > 0) {

		connection.query('UPDATE progress SET maxLevel = (?), cennitPoints = (SELECT SUM(points) FROM history WHERE codUser = (?)) WHERE codUser = (?)'
			,[level, codUser, codUser]), function(error, result) {

			if (error) {
				console.log(error)
				res.send(error)
			}
		}	
	}

	else if (level <= 0) {

		connection.query('UPDATE progress SET cennitPoints = (SELECT SUM(points) FROM history WHERE codUser = (?)) WHERE codUser = (?)'
			, [codUser, codUser], function(error, result) {

				if (error) {
					console.log(error)
					res.send(error)
				}
		})
	}

	connection.end()
	
}) 

module.exports = router;
