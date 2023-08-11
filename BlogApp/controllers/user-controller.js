const User = require('../model/User');
const bcrypt = require('bcryptjs');

// getting all user
exports.getAlluser = async function (req, res, next) {
    try {
        const users = await User.find();

        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No Users found' });
        }

        return res.status(200).json({ users });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// create a new user
// sign up new user 

exports.signup = async function (req, res, next) {
    const { name, email, password } = req.body;

    let availableUser;

    try {
        availableUser = await User.findOne({ email });
    } catch (error) {
        return console.log(error);
    }

    if (availableUser) {
        return res.status(400).json({ message: "User already exists.." });
    }

    const hasedPassword = bcrypt.hashSync(password);
    const user = new User({
        name,
        email,
        password: hasedPassword,
        blogs : [],
    });


    try {
        await user.save();
    } catch (error) {
        return console.log(error);
    }

    return res.status(201).json({ user });
};

// Login User

exports.login = async function(req, res, next){

    const{email, password} = req.body;

    let availableUser;

    try {
        availableUser = await User.findOne({email});
    } catch (error) {
        return console.log(error);
    }

    if(!availableUser){
        return res.status(404).json({message : "User not exists !"});
    }

    const passwordMatch = bcrypt.compareSync(password, availableUser.password);
    if(!passwordMatch){
        return res.status(400).json({message : "Password doesnot match to this user"});
    }
    return res.status(200).json({message: "Login Successfuly..."});
}