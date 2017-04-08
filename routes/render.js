var express = require('express')
var router = express.Router()

router.post('/', function(req, res) {

	var render = req.body.render;

	if(render == 'Perfil') {
		res.redirect('/profile')
	}	

	else if (render == "Noticias") {
		res.redirect('/news')
	}
})

module.exports = router;