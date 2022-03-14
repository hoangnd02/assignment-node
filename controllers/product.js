import mongoose from "mongoose";
// 1 Khởi tạo model
const Product = mongoose.model('Product', { 
    name: String,
    price: Number,
    desc: String,
    img: String
});

// API thêm sản phẩm
export const create = async (req, res) => {
    try {
        const product = await new Product(req.body).save();
        res.json(product)    
    } catch (error) {
        res.status(400).json({
            message: "Không thêm được sản phẩm anh ei"
        })
    }
}
// API list sản phẩm
export const list = async (req, res) => { 
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(400).json({
            message: "Lỗi không tìm được sản phẩm"
        })
    }
}
export const read = (req, res) => {
    res.json(products.find(item => item.id === +req.params.id));
}

export const remove = async (req, res) => {
    const product = await Product.findByIdAndDelete({ _id: req.params.id })
    res.json(product)
}
export const update = async (req, res) => {
    const product = await Product.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
    res.json(product)
}