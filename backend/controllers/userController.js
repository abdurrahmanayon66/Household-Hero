const { User } = require('../models'); // Adjust the path as needed
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
  const { name, age, gender, contactNumber, email, password, confirmPassword, address} = req.body;
  const { buffer } = req.file; 

  if (password !== confirmPassword) {
    return res.status(400).send('Passwords do not match');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      age,
      gender,
      email,
      password: hashedPassword,
      userImage: buffer,
      contactNumber,
      address
    });
    res.status(200).json({ message: 'Account created successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.loginUser = async(req,res) =>{

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getUserInfo = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findOne({ where: { userId: userId } }); // Ensure the key matches your model's field
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const base64Image = user.userImage
      ? Buffer.from(user.userImage).toString('base64')
      : null;
    
    // Create a response object that includes all the helper data
    const response = {
      ...user.toJSON(), // Convert the Sequelize instance to a plain object
      userImage: base64Image // Replace the helperImage field with the base64 encoded image
    };
    
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving user.' });
  }
};