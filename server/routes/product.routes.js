import express from 'express'
import productCtrl from '../controllers/product.controller.js'

const router = express.Router()
router.route('/api/products').post(productCtrl.addNewProduct)
router.route('/api/products').get(productCtrl.getAllProducts)
router.param('id', productCtrl.getProductById)
router.route('/api/products/:id').get(productCtrl.read)
router.route('/api/products/:id').put(productCtrl.update)
router.route('/api/products').delete(productCtrl.removeAllProducts)
router.route('/api/products/:id').delete(productCtrl.remove)
router.param('name', productCtrl.getProductByName)
router.route('/api/products/:name').get(productCtrl.readByName)

export default router
