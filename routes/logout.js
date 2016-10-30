var express = require('express');
var router = express.Router();

/* DELETE session. */
router.delete('/', function(req, res, next) {

	req.session.destroy();
	res.clearCookie('user');
	res.redirect('/');
  		
});

module.exports = router;