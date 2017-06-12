var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../config');

router.get('/:user/:hash', function(req, res, next) {

	var connection = mysql.createConnection({
		host: config.host,
		user: config.user,
		password: config.password,
		database: config.database,
		port: config.port
	})

	var user = req.params.user;
	var hash = req.params.hash

	connection.query('SELECT strRegisterHash from users WHERE strUsername = (?) AND strRegisterHash = (?)',
		[user, hash], function(err, result) {

			if (err) {
				return res.send(err);
			}

			else if (result.length > 0) {

				connection.query('UPDATE users SET is_active = "active", strRegisterHash = NULL WHERE strUsername = (?)'
					,[user], function(err, result) {

						if (err) {
							return res.send(err)
						}

						else {

							//Destroy the cookies
							res.clearCookie('userID_', {path: '/'});
							res.clearCookie('user', {path: '/'});
							res.clearCookie('is_admin', {path: '/'});
							res.clearCookie('codUser' , {path: '/'});
							res.clearCookie('isActive', {path: '/'});

							//And destroy the session						
							req.session.destroy();
							
							res.redirect('/');
						}
				})
			}
		})
})

module.exports = router;