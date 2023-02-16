import {Router} from 'express'
import User from '../models/User.js'
import bcrytp from 'bcrypt'
const router = Router()

router.get('/login', (req, res) => {
	res.render('login', {
		title: 'Login | bexa',
		isLogin: true,
		loginError: req.flash("loginError")
	})
})

router.get('/register', (req, res) => {
	res.render('register', {
		title: 'Register | bexa',
		isRegister: true,
		registerError: req.flash("registerError"),
	})
})

router.post('/login', async (req, res) => {
	const {email,password}  = req.body

	if(!email || !password) {
		req.flash('loginError', 'All fields is required')
		res.redirect('/login')
		return
	}
const existUser = await User.findOne({email})
if(!existUser) {
	req.flash('loginError', 'User not found')
	res.redirect('/login')
	return
	
}

const isPassEqual = await bcrytp.compare(password, existUser.password)
if(!isPassEqual)  {
	req.flash('loginError', 'Password Wrong')
	res.redirect('/login')
	return
	
}

console.log(existUser);
	res.redirect('/')
})

router.post('/register', async (req, res) => {
	const {firstname,lastname,email,password} = req.body
	if(!firstname || !lastname || !email || !password) {
		req.flash('registerError', 'All fields is required')
		res.redirect('/register')
		return
	}
	const candidate =await User.findOne({email})
if(candidate) {
	req.flash('registerError', 'User already exist')
	res.redirect('/register')
	return
}
	const hashedPassword = await bcrytp.hash(password,10)
	const userData = {
		firstName: firstname,
		lastName: lastname,
		email: email,
		password: hashedPassword,
	}
	const user = await User.create(userData)
	console.log(user);
	res.redirect('/')
})

export default router