import Category from "../modals/category";
import Product from "../modals/product";

export const create = async (req, res) => {
    try {
        const category = await new Category(req.body).save()
        res.json(category);
    } catch (error) {
        res.status(400).json({error})
    }
}

export const list = async (req, res) => {
    try {
        const categories = await Category.find().exec();
        res.json(categories);
    } catch (error) {
        res.status(400).json({error})
    }
}

export const read = async ( req, res) => {
    try {
        const category = await Category.findOne({_id: req.params.id}).exec();
        const products = await Product.find({category}).select("-category").exec();
        res.json({
            category,
            products
        })
    } catch (error) {
        console.log(error)
    }
}

export const edit = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate({_id: req.params.id}, req.body, { new: true }).exec();
        res.json({
            category
        })
    } catch (error) {
        console.log(error)
    }
}

export const remove = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete({_id: req.params.id}).exec();
        res.json({
            category
        })
    } catch (error) {
        console.log(error)
    }
}