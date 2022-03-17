import Product from "../modals/product";

export const create = async (req, res) => {
    try {
        const product = await new Product(req.body).save();
        res.json(product)    
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Không thêm được sản phẩm anh ei"
        })
    }
}

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

export const read = async (req, res) => {
    const product = await Product.findById({ _id: req.params.id })
    res.json(product)
}

export const remove = async (req, res) => {
    const product = await Product.findByIdAndDelete({ _id: req.params.id })
    res.json(product)
}

export const update = async (req, res) => {
    const product = await Product.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
    res.json(product)
}