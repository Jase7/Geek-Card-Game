var express = require('express');
var router = express.Router();
var functions = require('../functions');

/* GET profile page. */
router.get('/', function(req, res) {

	//If the cookies are setted
	if (req.cookies['user'] && req.cookies['is_admin'] && req.cookies['userID_']) {

		//Handling the cookie is the correct 
		functions.getSessionID(req.cookies['user'], function(result) {

			var sesion = result;

			//If it's the same, you have access to the page
			if (req.cookies['userID_'] == sesion) {

				res.render('profile', { user: req.cookies['user']});				
			}

			//If doesn't you have to log in again
			else {
				res.redirect('/');
			}
		});	
	} 

	//There aren't no cookies but there are ssessions
	else if (req.session.user && req.session.admin && req.session.userID) {

		res.render('profile', { user: req.session.user})
	}

	//You're not logged in
	else {
		res.redirect('/');
	}    		
});


module.exports = router;