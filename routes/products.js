import {Router} from 'express'
const router = Router()

router.get('/', (req, res) => {
	res.render('index', {
		title: 'boom shoop || bexa',
		token: true

	})
})

router.get('/products', (req, res) => {
	res.render('products', {
		title: "products",
		isProducts:true
	})
})

router.get('/add', (req, res) => {
	res.render('add', {
		title: 'add products',
		isAdd: true
	})
})

export default router
