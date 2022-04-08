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
    const limitNumber = 8
    const limit = req.query.limit ? +req.query.limit : limitNumber;
    const page = req.query.page ? +req.query.page : 1;
    const skip = (page - 1) * limit;
    const filter = req.query
    try {
        console.log((req.query ? req.query : ""), "hoang");
        const products = await Product.find(filter).skip(skip).limit(limit).select("-__v -createdAt -updatedAt");
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

export const search = async (req, res) => {
    const limitNumber = 20
    const limit = req.query.limit ? +req.query.limit : limitNumber;
    Product.find({
        $text: { $search: req.query.q }
    }).limit(limit)
    .exec(function(err, data) {
        if(err) res.json(err)
        res.json(data)
    });
}

//pagenation product
export const pagination = async (req, res) => {
    const limitNumber = 20
    const limit = req.query.limit ? +req.query.limit : limitNumber;
    const page = req.query.page ? +req.query.page : 1;
    const skip = (page - 1) * limit;
    try {
        const products = await Product.find().skip(skip).limit(limit).select("-__v -createdAt -updatedAt");
        res.json(products);
    } catch (error) {
        res.status(400).json({
            message: "Lỗi không tìm được sản phẩm"
        })
    }
}