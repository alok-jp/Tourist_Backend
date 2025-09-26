const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.signup= async (req,res)=> {

    try{   

        const {fullName, username, email, phone, dob, gender,
            password, address, governmentID, financialInfo,
            acceptTerms, acceptPrivacy, consentGiven } = req.body;

            if(!fullname || !username || !email || !phone ){

                return res.status(400).json({
                    success: false,
                    message: "All fields are required"
                })
            }
         }catch(error){

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Signup failed"
        })
    }

}


exports.login = async (req, res) => {

    try{

        const {email , password } = req.body;

        const user = await User.findOne({
            email: email,
        })

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }


        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not foumd"
            })
        }

        if(await bcrypt.compare(password, user.password)){

            const payload = {
                email: user.email,
                id: user._id,
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expressIn: '2h',
            })

            const options = {
                expires: new Date(Date.now() + 7*24*60*60*1000),
                httpOnly: true,
            }

            res.cookie("token", token, options).status(200).json({

                sucess: true,
                message: "Login successful",
            })

        }

    }catch(error){

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Login failed"
        })
    }
}