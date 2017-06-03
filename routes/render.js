var express = require('express')
var router = express.Router()

router.post('/', function(req, res) {

	let route = req.body.route;
	let news = req.body.new;

	if(news != undefined) {
		//let's create the url of the new
		news = news.toLowerCase();
		news = news.replace(/ /g, "-");
		news = news.replace(/á/g, "a");
		news = news.replace(/é/g, "e");
		news = news.replace(/í/g, "i");
		news = news.replace(/ó/g, "o");
		news = news.replace(/ú/g, "u");
		news = news.trim();

		console.log('/news/' + news)
		res.redirect('/news/' + news);
	}

	else {
		if(route == 'Perfil') {
			res.redirect('/profile');
		}

		else if (route == 'Noticias') {
			res.redirect('/news')
		}

		else if (route == 'Sabiduria') {
			res.redirect('/wisdom');
		}
	}
	
})

module.exports = router;