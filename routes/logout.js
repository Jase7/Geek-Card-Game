var express = require('express');
var router = express.Router();

/* DELETE session. */
router.delete('/', function(req, res, next) {

	//Destroy the cookies
	res.clearCookie('userID_', {path: '/'});
	res.clearCookie('user', {path: '/'});
	res.clearCookie('is_admin', {path: '/'});
	res.clearCookie('codUser' , {path: '/'});
	res.clearCookie('isActive', {path: '/'});

	//Destroy the session
	req.session.destroy();	

	res.redirect('/');
  		
});

module.exports = router;