import Cart from '../modals/cart';

export const list = async (req, res) => {
    try {
        const cart = await Cart.findOne({user: req.params.user_id})
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
