var config = require('./config');
var mysql = require('mysql');

exports.getSessionID = function (user, callback) {

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

						callback(resultado);
					}
				}
			})

		connection.end();

	} //end getSessionID,

exports.saveIsActive = function(session_id, user) {

		var connection = mysql.createConnection({	
			host: config.host,
			user: config.user,
			password: config.password,
			database: config.database,
			port: config.port
		});

		var query = connection.query('UPDATE users SET is_active = (?) WHERE strUsername = (?)'
			, [session_id, user]

			, function(error, result) {

				if (error) {
					console.log(error)
				}
			});

		connection.end();

} //end saveIsActive

exports.getNews = function (callback) {

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