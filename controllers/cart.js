import mongoose from 'mongoose';
import Cart from '../modals/cart';
import Product from '../modals/product';

export const list = async (req, res) => {
    try {
        const cart = await Cart.findOne({user: req.params.user_id})
        const ids = []
        cart.cartItems.forEach(item => ids.push(item.product))
        const listProduct = await Product.find({
            '_id': { $in: ids }
        })
        console.log(listProduct)
        cart.cartItems.forEach((item, index) => item.product = listProduct[index])
        res.json(cart.cartItems)
    } catch (error) {
        console.log(error);        
    }
}

export const addCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({user: req.params.user_id})
        if (cart) {
            const newProduct = req.body
            let checkProduct = false
            cart.cartItems.map(product => {
                if(product.product == newProduct.product) {
                    product.quantity = newProduct.quantity
                    checkProduct = true
                } 
            });
            if(!checkProduct) {
                cart.cartItems.push(newProduct)
            }
            const newCart = await Cart.findOneAndUpdate({user: req.params.user_id}, cart, {new: true})
            console.log(newCart, 28)
            res.json(newCart.cartItems)
        } else {
            const cart = await new Cart(req.body).save()
            res.json(cart.cartItems)
        }
    } catch (error) {
        console.log(error);        
    }
}
