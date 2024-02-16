import express from 'express'
import productCtrl from '../controllers/product.controller.js'

const router = express.Router()
//router.route('/api/users').post(userCtrl.create)
//router.route('/api/users').get(userCtrl.list)
//router.param('userId', userCtrl.userByID)
//router.route('/api/users/:userId').get(userCtrl.read)
//router.route('/api/users/:userId').put(userCtrl.update)
//router.route('/api/users/:userId').delete(userCtrl.remove)

router.route('/api/products').post(productCtrl.addNewProduct)
router.route('/api/products').get(productCtrl.getAllProducts)
router.param('id', productCtrl.getProductById)
router.route('/api/products/:id').get(productCtrl.read)
router.route('/api/products/:id').put(productCtrl.update)
router.route('/api/products').delete(productCtrl.removeAllProducts)
router.route('/api/products/:id').delete(productCtrl.removeProductsById)
router.param('name', productCtrl.getProductByName)
router.route('/api/products/:name').get(productCtrl.readByName)
//router.route('/api/products/:id').get(productCtrl.getProductById)

export default router
