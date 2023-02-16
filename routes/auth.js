import {Router} from 'express'
import User from '../models/User.js'
import bcrytp from 'bcrypt'
const router = Router()

router.get('/login', (req, res) => {
	res.render('login', {
		title: 'Login | Sammi',
		isLogin: true,
	})
})

router.get('/register', (req, res) => {
	res.render('register', {
		title: 'Register | Sammi',
		isRegister: true,
	})
})

router.post('/login', async (req, res) => {
const existUser = await User.findOne({email:req.body.email})
if(!existUser) {
	console.log("user not found")
	return false
}
const isPassEqual = await bcrytp.compare(req.body.password, existUser.password)
if(!isPassEqual)  {
	console.log('password wrong');
	return
}

console.log(existUser);
	res.redirect('/')
})

router.post('/register', async (req, res) => {
	const hashedPassword = await bcrytp.hash(req.body.password,10)
	const userData = {
		firstName: req.body.firstname,
		lastName: req.body.lastname,
		email: req.body.email,
		password: hashedPassword,
	}
	const user = await User.create(userData)
	console.log(user);
	res.redirect('/')
})

export default router