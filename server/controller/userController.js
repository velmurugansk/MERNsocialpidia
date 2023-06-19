import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    try{
        const {
            firstName, 
            lastName, 
            email, 
            password,
            picturePath,
            friends,
            location,
            occupation 
        } = req.body;
        
        const salt = await bcrypt.genSalt();
        const hashpassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName, 
            lastName, 
            email, 
            password: hashpassword,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        });

        const savedUser = await newUser.save();

        res.json({status:true,message:`User Registered Successfully.`});
    } catch (err) {
        res.json({status:false,message:err.message});
    }
}

export const login = async (req, res) => {    
    try{
        const { email, password } = req.body;        
        if(!email || !password) {
            return res.json({status:false, message:`Email and Password Required!`});
        }

        const user =await User.findOne({email:email});
        
        if(!user) return res.json({status:false, message:`User does not exist`});
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.json({status:false, message:`Invalid Credentials.`});

        const token = jwt.sign({id:user._id}, process.env.SECRETKEY);
        delete user.password;             
        res.json({status:true,token,data:user});

    } catch(err) {
        
        res.json({status:false,message:err.message});
    }
}