var express = require('express');
var hash = require("password-hash");
var bcrypt = require('bcrypt-nodejs');
var nodemailer = require('nodemailer');
var functions = require('../functions');
var router = express.Router();

/* GET register page. */
router.get('/', function(req, res, next) {

	//If the cookies are setted
	if (req.cookies['user'] && req.cookies['is_admin'] && req.cookies['userID_']) {

		//Handling the cookie is the correct 
		functions.getSessionID(req.cookies['user'], function(result) {

			var sesion = result;

			//If it's the same, you have access to the page
			if (req.cookies['userID_'] == sesion) {

				res.redirect('/news')				
			}

			//If doesn't you have to log in again
			else {
				res.redirect('register', {});
			}
		});	
	} 

	//There aren't no cookies but there are session

	else if (req.session.user && req.session.admin && req.session.userID) {

		res.redirect('/news')
	}

	//You're not logged in
	else {
		res.render('register');
	}
});

module.exports = router;

/* POST register data */
router.post('/', function(req, res, next) {

	var connection = mysql.createConnection({
		host: config.hostname,
		user: config.user,
		password: config.pass,
		database: config.database,
		port: config.port
	});

	connection.connect(function(error){

	   if (error){
	      console.log(error);
	   } else{
	      console.log('Conexion correcta.');
	   }
	});

	var user = req.sanitize(req.body.user);
	var email = req.sanitize(req.body.email);
	var pass = req.sanitize(req.body.pass);
	var currentTime = new Date();
	var hashLogin = hash.generate(Math.random().toString(36).substring(50));

	bcrypt.hash(pass, null, null, function(err, hash) {

		var query = connection.query('INSERT INTO users (strUsername, strEmail, strPassword, datRegisterDate, strRegisterHash) VALUES(?, ?, ?, NOW(), ?)'
		, [user, email, hash, hashLogin]

		, function(error, result){
			   	if (error) {
			   		console.log(error);
			   	}

			   	else {
			   		/*//SMTP Config
			   		var smtpConfig = {
					    host: 'smtp.gmail.com',
					    port: 465,
					    secure: true, // use SSL 
					    auth: {
					        user: 'user@gmail.com',
					        pass: 'pass'
					    }
					};

			   		// create reusable transporter object using the default SMTP transport 
			   		var transporter = nodemailer.createTransport(smtpConfig);

			   		// setting some options
			   		var mailOptions = {
					    from: '"Geek Card Game" <admin@geekcardgame>', // sender address 
					    to: email, // list of receivers 
					    subject: 'Geek Card Game', // Subject line 
					    text: 'Geek Card Game', // plaintext body 
					    html: '<b>Te has registrado en Geek Card Game :)</b>' // html body 
					};

					// send mail with defined transport object 
					transporter.sendMail(mailOptions, function(error, info){
					    if(error){
					        return console.log(error);
					    }
					    console.log('Message sent: ' + info.response);
					});*/

			    	res.redirect('/');
			   }
		}
	);

	connection.end(); 

	})
    	
});	

module.exports = router;