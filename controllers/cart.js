import mongoose from 'mongoose';
import Cart from '../modals/cart';
import Product from '../modals/product';

export const list = async (req, res) => {
    try {
        const cart = await Cart.findOne({user: req.params.user_id}).populate({
            path: 'cartItems',
            populate: { path: 'product' }
        })
        res.json(cart.cartItems)
    } catch (error) {
        console.log(error);        
    }
}

export const addCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({user: req.params.user_id})
        if (cart) {
            console.log(true);
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
            const newCart = await Cart.findOneAndUpdate({user: req.params.user_id}, cart, {new: true}).populate('user')
            res.json(newCart)
        } else {
            const newCart = {
                user: req.params.user_id,
                cartItems: [req.body]
            }
            const cart = await new Cart(newCart).save()
            console.log(false)
            res.json(cart.cartItems)
        }
    } catch (error) {
        console.log(error);        
    }
}
