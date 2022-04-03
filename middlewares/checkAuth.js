import expressJWT from 'express-jwt';

export const checkAuth = (req, res, next) => {
    const status = true;
    if(status){
        next();
    } else {
        console.log("Anh không có quyền truy cập");
    }
}

export const requiredSignin = expressJWT({
    algorithms: ["HS256"],
    secret: "123456",
    requestProperty: "auth"
})

export const isAuth = (req, res, next) => {
    console.log('req.profile',req.profile);
    console.log('req.auth',req.auth);

    const status = req.profile._id == req.auth._id;
    if(!status){
        res.status(400).json({
            message: "Ban khong co quyen truy cap"
        })
    }
    next();
}