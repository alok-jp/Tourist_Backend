
const User = require('../models/userModel');

const bcrypt = require('bcrypt');

exports.signup = async(req, res) => {

  try {
    const {
      fullName,
      username,
      email,
      phone,
      dob,
      gender,
      password,
      address,
      governmentID,
      financialInfo
    } = req.body;

    if(!fullName || !username || !email || !phone || !dob 
        || !gender || !password || !address || !governmentID){

            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }



    // Check if username or email already exists
    if (existingUser) {
      return res.status(409).json({ error: 'User with this email or username already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user document
    const newUser = new User({
      fullName,
      username,
      email,
      phone,
      dob,
      gender,
      password: hashedPassword,   // store hashed password
      address,
      governmentID,
      financialInfo,
      updatedAt: Date.now()
    });

    await newUser.save();
    return res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ error: 'Internal server error' });
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
                message: "User not found"
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
                token,
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

exports.update = async(req, res) => {

    

    try{

    const { governmentID, financialInfo } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);

    if(!user){

        return res.status(404).json({
            success: false,
            message: "User not found"
        })
    }

    if(!governmentID){

        return res.status(400).json({
            success: false,
            message: "Government ID is required"
        })
    }

    user.governmentID = governmentID;
    user.financialInfo = financialInfo;

    await user.save();

    return res.status(200).json({
        success: true,
        message: "User updated successfully",

    })


    }catch(error){
        
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Update failed"
        })
    }
}