var express = require('express');
var router = express.Router();

/* GET profile page. */
router.get('/', function(req, res, next) {

	//If there's a session...
	if (req.session.user) {

		res.render('profile', {
			user: req.session.user
		});
	}

	//...or cookies
	else if (req.cookies.user) {

		res.render('profile', {
			user: req.cookies.user
		})
	}	

	//If there aren't just go to the login page
	else {
		res.redirect('/');
	}
  		
});


module.exports = router;