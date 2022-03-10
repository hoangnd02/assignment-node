import { Router } from "express"

const route = Router();

const check = (req, res, next) => {
    const status = true
    if(status) {
        next()
    } else {
        console.log("Anh không có quyền")
    }
}
route.get("/api/products", check, (req, res) => {
    const products = [
        {
            id: 1,
            name: "Product A"
        },
        {
            id: 2,
            name: "Product B"
        },
    ]
    res.json(products)
})

route.post("/api/products", check, (req, res) => {
    const products = [
        {
            id: 1,
            name: "Product A"
        },
        {
            id: 2,
            name: "Product B"
        },
    ]
    res.json(products)
})


export default route