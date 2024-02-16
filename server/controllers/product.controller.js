import Product from '../models/product.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'

const addNewProduct = async (req, res) => { 
    const product = new Product(req.body) 
    try {
        await product.save()
        return res.status(200).json({ 
            message: "Successfully created product!"
        })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err) 
        })
    } 
}

const getAllProducts = async (req, res) => { 
    try {
        //let products = await Product.find().select('name price category description quantity updated created') 
        let products = await Product.find().select('name price category description quantity') 
        res.json(products)
    } catch (err) {
        return res.status(400).json({
        error: errorHandler.getErrorMessage(err) 
        })
    } 
}

/*
const getProductById = async (req, res) => { 
    try {
        //let products = await Product.find().select('name price category description quantity updated created') 
        let products = await Product.find().select('name price category description quantity') 
        res.json(products)
    } catch (err) {
        return res.status(400).json({
        error: errorHandler.getErrorMessage(err) 
        })
    } 
}
*/

const getProductById = async (req, res, next, id) => { 
    try {
        let product = await Product.findById(id) 
        if (!product)
            return res.status('400').json({ 
                error: "Product not found"
            })
        req.profile = product 
        next()
    } catch (err) {
        return res.status('400').json({ 
        error: "Could not retrieve product"
        }) 
    }
}


const getProductByName = async (req, res, next, inName) => { 
    try {
        let product = await Product.find({name:'Category'}).exec();
        if (!product)
            return res.status('400').json({ 
                error: "Product not found"
            })
        req.profile = product
        next()
    } catch (err) {
        return res.status('400').json({ 
        error: "Could not retrieve product"
        }) 
    }
}

/*
const userByID = async (req, res, next, id) => { 
    try {
        let user = await User.findById(id) 
        if (!user)
        return res.status('400').json({ 
        error: "User not found"
        })
        req.profile = user 
        next()
    } catch (err) {
        return res.status('400').json({ 
        error: "Could not retrieve user"
        }) 
    }
}
*/

/*
const read = (req, res) => {
    req.profile.hashed_password = undefined 
    req.profile.salt = undefined
    return res.json(req.profile) 
}
*/
const read = (req, res) => {
    return res.json(req.profile) 
}

const readByName = (req, res) => {
    return res.json(req.profile) 
}

/*
const update = async (req, res) => { 
    try {
        let user = req.profile
        user = extend(user, req.body) 
        user.updated = Date.now() 
        await user.save()
        user.hashed_password = undefined 
        user.salt = undefined
        res.json(user) 
    } catch (err) {
        return res.status(400).json({
        error: errorHandler.getErrorMessage(err) 
        })
    } 
}
*/
const update = async (req, res) => { 
    try {
        let product = req.profile
        product = extend(product, req.body) 
        product.updated = Date.now() 
        await product.save()
        res.json(product) 
    } catch (err) {
        return res.status(400).json({
        error: errorHandler.getErrorMessage(err) 
        })
    } 
}

/*
const remove = async (req, res) => { 
    try {
        let user = req.profile
        let deletedUser = await user.deleteOne() 
        deletedUser.hashed_password = undefined 
        deletedUser.salt = undefined
        res.json(deletedUser) 
    } catch (err) {
        return res.status(400).json({
        error: errorHandler.getErrorMessage(err) 
        })
    } 
}
*/


const removeProductsById = async (req, res, next, id) => { 
    try {
        let product = req.profile
        let deleteproduct = await product.deleteOne({_id: id})
        next()
    } catch (err) {
            return res.status('400').json({ 
            error: "Could not remove product by ID"
        }) 
    }
}


const removeAllProducts = async (req, res) => {
    try {
        let product = req.profile
        await product.deleteMany();

        let products = await Product.find().select('name price category description quantity') 
        res.json(products)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)    
        })
    }
}

// export default { create, userByID, read, list, remove, update }
export default { addNewProduct, getAllProducts, getProductById, read, update, removeAllProducts, removeProductsById, getProductByName, readByName }
