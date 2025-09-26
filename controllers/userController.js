const Contact = require("../models/contactModel");
const User = require('../models/')

exports.contact = async (req, res) => {

    try{

        const {email, phone} = req.body;
        
        const userId = req.user.id;

        if(!phone){
            return res.status(400).json({
                success: false,
                message: "Phone number is required"
            })
        }

        if(!userId){
            return res.status(400).json({
                success: false,
                message: "User ID not found"
            })
        }

        const user = await User.findById(userId,
            { $push: { contacts: contact._id}},
            {new: true,}
           
        )

    }catch(error){
        console.log(error);

        return res.json({
            success: false,
            message: "Failed to add contact"
        })
    }
}