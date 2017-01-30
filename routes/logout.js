var express = require('express');
var router = express.Router();

/* DELETE session. */
router.delete('/', function(req, res, next) {

	//Destroy the session
	req.session.destroy();

	//Destroy the cookies
	res.clearCookie('userID');
	res.clearCookie('user');
	res.clearCookie('is_admin');
	res.redirect('/');
  		
});

module.exports = router;