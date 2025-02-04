const Users = require('../models/user_model');
const bcrypt = require('bcrypt');

async function httpRegisterUser(req, res) {
  try {
    const { username, email, password } = req.body;

    // Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    // Check for existing user
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const saltRounds = 10; // Recommended salt rounds
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const user = new Users({ username, email, password: hashedPassword }); 
    await user.save();

    // Respond with success without password
    res.status(201).json({
      message: "User created successfully",
      user: user.toObject({ virtuals: true }),
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}


async function httpGetUsers(req, res){
    const users = await Users.find({}, "-password");

    // Access user data from req.user object (obtained from JWT)
    res.json({
        
        message: "Welcome, authorized user!",
        user: users
    })
}



// Update user controller
async function httpUpdateUser (req, res) {
    const { id } = req.params;
    const { username, email, password, role } = req.body;

    try {
        // Find user by ID
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user fields
        if (username) user.username = username;
        if (email) user.email = email;
        if (role) user.role = role;

        // Update password if provided
        if (password) {
            const salt = await bcrypt.genSalt(20);
            user.password = await bcrypt.hash(password, salt);
        }

        // Save updated user
        await user.save();

        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
}



module.exports = {
    httpRegisterUser,
    httpUpdateUser,
    httpGetUsers
}