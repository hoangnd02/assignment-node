export const checkAuth = (req, res, next) => {
    const status = true;
    if(status){
        next();
    } else {
        console.log("Anh không có quyền truy cập");
    }
}