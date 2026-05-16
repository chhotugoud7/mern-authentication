import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../Models/userModel.js'

export const register = async (req, res)=>{

    const {name, email, password} = req.body;

    if(!name || !email || !password){
        return res.json({success: false, message: 'Missing Details'})
    }

    try {

        const existingUser = await userModel.findOne({email})

        if(existingUser){
            return res.json({success: false, message: "User already exists" });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10) // in this we can choose security by choosing 0 to 15 and here 15 is highest form of encryption but it takes more time.

        // making user for database bcz there is no existing user 
        const user = new userModel({name, email, password: hashedPassword});
        await user.save();

        //generate a token for authentication:- after userdata saved in db
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        //after generating the token we have send it to the res(response) and in res we will be adding cookie.. 

        // generating cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // maxAge in milliseconds
        });

    } catch (error) {
        res.json({success: false, message: error.message})
        
    }


}