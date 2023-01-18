const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const User = require("../models/user");

//gen token
const generateAuthToken = async (user) => {
    const token = await jwt.sign({ _id: user._id.toString()}, "newuser");  //jwt.verify method is
    return token;
};

//finding user
const findByCredentials = async (email, password,res) => {
    const user = await User.findOne({ email });
    console.log(user)
    if(!user) {
        return res.status(404).json({ error: "Invalid user!"});
    }
    const isMatch = await bcrypt.compare(password, user.password); //comparing the password with the hashPassword
    if(!isMatch) {
        return res.status(404).json({ error: "Invalid user!" });
    }
    return user;
};

//signup
exports.signup = async (req,res) => {
    const { firstName, lastName, email, password, profilePicture } = req.body;
    console.log("body: ", req.body);
    try {
        const isUser = await User.findOne({ email });
        if(!email){
            let obj = {
                data: [],
                status: 'failed',
                message: 'Email address not found',
                error: true
            }
            return res.status(400).json(obj);
        }
        if(isUser) {
            let obj = {
                data: [],
                status: 'failed',
                message: 'Email address already in use',
                error: true
            }
            return res.status(400).json(obj);
        }
        const user = new User(req.body);
        console.log("user",user)
        const hashedPassword = await bcrypt.hash(user.password, 8);
        console.log("hashedPassword",hashedPassword)
        user.password = hashedPassword;
        await user.save();
        const token = await generateAuthToken(user);
        delete user.password;
        let obj = {
            data: user|| [],
            token: token || '',
            status: 'success',
            message: 'User Created Successfully',
            error: false
        }
        res.status(201).json(obj);
    } catch (error) {
        let obj = {
            data: user|| [],
            status: 'failed',
            message: 'Something went wrong',
            error: true
        }
        console.log(error);
        return res.status(500).json(obj);
    }
};