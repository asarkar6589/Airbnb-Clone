const userModel = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

exports.registerUser = async (req, res) => {
    try {
        const { name, phone, email, password, image } = req.body;

        const isUserRegistered = await userModel.findOne({ email });

        if (isUserRegistered) {
            return res.json({
                success: false,
                message: "User is already registered"
            });
        }

        const hasshedPassword = await bcrypt.hash(password, 10);

        const userDoc = await userModel.create({
            name, phone, email, password: hasshedPassword, photo: image
        });

        res.status(200).json({
            success: true,
            message: `${name}, you are registered successfully 🙂`,
            userDoc
        });
    } catch (error) {
        res.json(error)
    }
}

exports.profilePhoto = (req, res) => {
    // const { filename } = req.file;
    // res.json(filename);

    const { path, originalname } = req.file;
    // console.log(path);

    // Since original name contains the whole name with extension and since it is a string, we will split it, now parts is an array. So the extension will be in the last part.
    const parts = originalname.split('.');
    const extension = parts[parts.length - 1];
    const newPath = path + '.' + extension;
    fs.renameSync(path, newPath);
    res.json(newPath.match(/[^\\]+$/)[0]);
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // checking if user is present or not
        const isUser = await userModel.findOne({ email });

        if (!isUser) {
            return res.json({
                success: false,
                message: 'You are not registered. Please register'
            });
        }

        const passwordComparison = await bcrypt.compare(password, isUser.password);

        if (!passwordComparison) {
            return res.json({
                success: false,
                message: 'Invalid email or password. Please try again !'
            });
        }

        const token = jwt.sign({ _id: isUser._id }, process.env.JWT_TOKEN);

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        }).json({
            success: true,
            message: `Welcome ${isUser.name}`,
            isUser
        });
    } catch (error) {
        res.json(error);
    }
}

exports.getMyProfile = async (req, res) => {
    try {
        // first check wether the user is logged in or not.
        const { token } = req.cookies;

        if (!token) {
            return res.json({
                sucess: false,
                message: 'You must be logged in'
            });
        }

        const decryptedToken_IdOfUser = jwt.decode(token);

        // finding the user from the database with the given id.
        const userDoc = await userModel.findById(decryptedToken_IdOfUser);

        res.json({
            sucess: true,
            userDoc
        });
    } catch (error) {
        res.json(error);
    }
}

exports.logOut = (req, res) => {
    const { token } = req.cookies;
    res.cookie("token", "", {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        expires: new Date(Date.now())
    }).json({
        sucess: true,
        message: 'Logged Out successfully. Than You for visiting...❣️'
    });
}