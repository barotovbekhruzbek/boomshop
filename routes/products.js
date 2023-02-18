import {Router} from 'express'
import Product from '../models/Products.js'
const router = Router()

router.get('/', (req, res) => {
	res.render('index', {
		title: 'Boom shop | bexa',
	})
})

router.get('/products', (req, res) => {
	res.render('products', {
		title: 'Products | bexa',
		isProducts: true,
	})
})

router.get('/add', (req, res) => {
	res.render('add', {
		title: 'Add products',
		isAdd: true,
	})
})
router.post('/add-products', async (req,res) => {
const {title,description,image,price} = req.body
const products = await Product.create(req.body)
console.log(products);
	res.redirect('/')
})

export default router
