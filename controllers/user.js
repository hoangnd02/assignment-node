import User from "../modals/user";

export const signup = async (req, res) => {
    try {
        const user = await new User(req.body).save();
        res.json(user)    
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Không thể đăng ký"
        })
    }
}

export const signin = async (req, res) => { 
    try {
        const users = await User.findOne(req.body);
        res.json(users);
    } catch (error) {
        res.status(400).json({
            message: "Không thể đăng nhập"
        })
    }
}
