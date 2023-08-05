const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const passport = require("passport");


router.post('/login', passport.authenticate("local", {
	failureRedirect: '/login',
	failureFlash: true
}), (req, res)=>{
	User.findOne({email: req.body.email}).then((user)=>{
		res.send(user);
	}).catch((err)=>{
		req.flash('error_msg','Invalid Credentials! If error persists, contact support.');
		return res.redirect('back');
	});
});

router.post('/register', (req, res)=>{
	const { email, password } = req.body;
	let errors = [];
	if( !email || !password ){
		errors.push({msg: 'Please enter all fields'});
	};
	if (password.length < 8 ) {
		errors.push({ msg: 'Password must be at least 8 characters' });
	};
	if(errors.length > 0){
		res.render('land2/register', {errors, email, password});
	}else{
		req.body.username = email;
		User.findOne({email}).then((user)=>{
			if(user){
				errors.push({ msg: 'An account with this email already exists. Please login' });
				return res.render('land2/login', {errors});
			} else{
				User.register(new User(req.body),password)
				.then((new_user)=>{
					// welcome_mail(new_user);
					req.flash('success_msg', 'Account created, Please login');
  				return res.redirect('/login');
				})
				.catch((err)=>{
					errors.push({msg: 'Something went wrong'})
				});
			}
		})
	}
});

module.exports = router;
