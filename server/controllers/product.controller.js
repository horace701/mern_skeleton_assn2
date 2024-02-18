import Product from '../models/product.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'

const addNewProduct = async (req, res) => { 
    console.log("addNewProduct");
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
    let strURL = JSON.stringify(req.url);
    console.log("getAllProducts:" + strURL);
    try {
        if (req.url.includes("products?name")) {
            console.log("getAllProducts with filter");

            var idx = strURL.indexOf("[");
            var subString = strURL.substring(idx+1, strURL.length-2);
            console.log("subString:" + subString);
            
            var strQuery = decodeURIComponent(subString);
            console.log("strQuery:" + strQuery);
            //let products = await Product.find( { "name" : /Product 11/ } ); 
            let products = await Product.find( { "name" : { $regex: strQuery } } ).select('name price category description quantity'); 

            res.json(products);
        }
        else {
            console.log("getAllProducts without filter");
            let products = await Product.find().select('name price category description quantity'); 
            res.json(products);
        }
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err) 
        })
    } 
}


const getProductById = async (req, res, next, id) => { 
    console.log("getProductById");
    try {
        let product = await Product.findById(id).select('name price category description quantity'); 
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
    console.log("getProductByName");
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


const read = (req, res) => {
    console.log("read");
    return res.json(req.profile) 
}

const readByName = (req, res) => {
    console.log("readByName");
    return res.json(req.profile) 
}


const update = async (req, res) => { 
    console.log("update");
    try {
        let product = req.profile
        product = extend(product, req.body) 
        //product.updated = Date.now() 
        await product.save()
        res.json(product) 
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err) 
        })
    } 
}


const remove = async (req, res) => { 
    try {
        console.log("remove");
        let product = req.profile;
        let deletedProduct = await product.deleteOne();
        res.json(deletedProduct) 
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err) 
        })
    } 
}


const removeProductsById = async (req, res, next, id) => { 
    try {
        console.log("removeProductsById");
        let product = req.profile
        let deletedProduct = await Product.deleteOne({_id: _id})
        //next()
        res.json(deletedProduct);
    } catch (err) {
            return res.status('400').json({ 
                error: "Could not remove product by ID"
        }) 
    }
}


const removeAllProducts = async (req, res) => {
    try {
        console.log("removeAllProducts");
        let isDeleted = await Product.deleteMany();
        res.json(isDeleted);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

export default { addNewProduct, getAllProducts, getProductById, read, update, remove, removeAllProducts, removeProductsById, getProductByName, readByName }
