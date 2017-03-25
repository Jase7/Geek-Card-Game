var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt-nodejs');
var config = require('../config');
var mysql = require('mysql');
var functions = require('../functions');

/* GET login page. */
router.get('/', function(req, res, next) {
	
	//If the cookies are setted
	if (req.cookies['user'] && req.cookies['is_admin'] && req.cookies['userID_'] && req.cookies['codUser']) {

		//Handling the cookie is the correct 
		functions.getSessionID(req.cookies['user'], function(result) {

			var sesion = result;

			//If it's the same, you have access to the page
			if (req.cookies['userID_'] == sesion) {

				res.redirect('/news')				
			}

			//If doesn't you have to log in again
			else {
				res.render('login');
			}
		});
	} 

	//There aren't no cookies but there are session
	else if (req.session.user && req.session.admin && req.session.userID) {

		res.redirect('/news')
	}

	//You're not logged in
	else {
		res.render('login');
	}	
});

/* POST login page. */
router.post('/', function(req, res) {

	var connection = mysql.createConnection({	
		host: config.host,
		user: config.user,
		password: config.password,
		database: config.database,
		port: config.port
	});

	var user = req.sanitize(req.body.user);
	var pass = req.sanitize(req.body.pass);
	var remember = req.body.remember;

	//Check if the user exists
	var query = connection.query('SELECT * from users WHERE strUsername = (?)'
		,[user]

		, function(error, result){

			if (error) {
				res.send(error)
			}

			else {
						
				//If the user exists
				if (result.length == 1) {
							
					//Now, check the pass using bcrypt
					var hash = result[0].strPassword;

					bcrypt.compare(pass, hash, function(error, resp) {

						if (error) {
							res.send(error);
						}

						else {

							if (resp) {

								//Now, we create the session and cookies depending of the remember in form
								if (remember == 'on') {

									functions.saveIsActive(req.sessionID, user);

									res.cookie('userID_', req.sessionID, {

										maxAge: 30 * 24 * 60 * 60 * 1000
										, httpOnly: true
									})

									res.cookie('user', user, {

										maxAge: 30 * 24 * 60 * 60 * 1000
										, httpOnly: true
									})

									res.cookie('is_admin', result[0].isAdmin, {

										maxAge: 30 * 24 * 60 * 60 * 1000
										, httpOnly: true

									})

									res.cookie('codUser', result[0].id, {

										maxAge: 30 * 24 * 60 * 60 * 1000
										,httpOnly: true

									}).redirect('/news');

								}

								else {

									req.session.userID = req.sessionID;
									req.session.user = user; //save the username
									req.session.admin = result[0].isAdmin; //save if user is admin or not
									req.session.codUser = result[0].id; //save the ID of the user

									res.redirect('/news');
								}
							} //End if (pass is true)

							//If pass is not the correct one
							else {
								res.render('login', {exist: '1'});

							} //End else (pass is not true)

						} //End else bcrypt

					}) //End bcrypt compare

				} //End if result length == 1

				//If the user doesn't exist we pass a variable for handling this issue
				else if (result.length == 0) {
					res.render('login', { exist: '0' })
				}
			}
		}); //End query

	connection.end();
}); //End router.post

module.exports = router;