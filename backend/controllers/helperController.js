const bcrypt = require('bcrypt');
const { Helper,Review,User } = require('../models'); // Adjust the path as needed
const sequelize = require('sequelize');

// Function to create a new helper
exports.createHelper = async (req, res) => {
  const { name, age, gender, about, email, password, confirmPassword, serviceType
        ,feePerDay,feePerMonth, serviceTitle, serviceDescription} = req.body;
  const { buffer } = req.file; 

  if (password !== confirmPassword) {
    return res.status(400).send('Passwords do not match');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newHelper = await Helper.create({
      name,
      about,
      age,
      gender,
      email,
      password: hashedPassword,
      helperImage: buffer,
      serviceType,
      feePerDay,
      feePerMonth : feePerMonth || null,
      serviceTitle,
      serviceDescription
    });
    res.status(200).json({ message: 'Account created successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getAllHelpers = async (req, res) => {
  try {
    const helpers = await Helper.findAll();
    const helpersWithBase64Images = helpers.map(helper => {
      let base64Image = null;
      if (helper.helperImage) {
        base64Image = Buffer.from(helper.helperImage).toString('base64');
      }
      return {
        ...helper.dataValues,
        helperImage: base64Image,
      };
    });

    res.status(200).json(helpersWithBase64Images);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving helpers.' });
  }
};

exports.gethelperById = async (req, res) => {
  const { helperId } = req.params;

  try {
    const helper = await Helper.findOne({ where: { helperId: helperId } }); // Ensure the key matches your model's field
    if (!helper) {
      return res.status(404).json({ error: 'Helper not found' });
    }
    const base64Image = helper.helperImage
      ? Buffer.from(helper.helperImage).toString('base64')
      : null;
    
    // Create a response object that includes all the helper data
    const response = {
      ...helper.toJSON(), // Convert the Sequelize instance to a plain object
      helperImage: base64Image // Replace the helperImage field with the base64 encoded image
    };
    
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving helper.' });
  }
};

exports.getHelpersByType = async(req,res) => {
  const { workType } = req.params;
  try {
    const helpers = await Helper.findAll({ where: { serviceType: workType } });
    const helpersWithBase64Images = helpers.map(helper => {
      let base64Image = null;
      if (helper.helperImage) {
        base64Image = Buffer.from(helper.helperImage).toString('base64');
      }
      return {
        ...helper.dataValues,
        helperImage: base64Image,
      };
    });

    res.status(200).json(helpersWithBase64Images);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving helpers.' });
  }
}

exports.updateHelperInformation = async (req, res) => {
  const { helperId } = req.params;
  const { name, age, gender, about, serviceType, feePerDay, feePerMonth, serviceTitle, serviceDescription } = req.body;

  try {
    const helper = await Helper.findOne({ where: { helperId: helperId } }); // Ensure the key matches your model's field
    if (!helper) {
      return res.status(404).json({ error: 'Helper not found' });
    }

    // Only update the fields that are present in the request body
    if (name !== undefined) helper.name = name;
    if (age !== undefined) helper.age = age;
    if (gender !== undefined) helper.gender = gender;
    if (about !== undefined) helper.about = about;
    if (serviceType !== undefined) helper.serviceType = serviceType;
    if (feePerDay !== undefined) helper.feePerDay = feePerDay;
    if (feePerMonth !== undefined) helper.feePerMonth = feePerMonth;
    if (serviceTitle !== undefined) helper.serviceTitle = serviceTitle;
    if (serviceDescription !== undefined) helper.serviceDescription = serviceDescription;

    await helper.save();

    res.status(200).json({ message: 'Helper information updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating helper information.' });
  }
}

exports.createHelperReview = async(req, res) => {
  const { helperId,userId,comment,rating } = req.body;
  try {
    const newReview = await Review.create({
      helperId,
      userId,
      comment: comment || null,
      rating
      });
      res.status(200).json({ message: 'Review created successfully' });
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
        }
};

exports.getReviewsByHelperId = async (req, res) => {
  const { helperId } = req.params;

  try {
    const reviews = await Review.findAll({
      where: { helperId },
      include: {
        model: User,
        as: 'User', // specify the alias
        attributes: ['name', 'userImage']
      },
      attributes: ['reviewId', 'helperId', 'userId', 'comment', 'rating', 'createdAt'] // Explicitly include createdAt
    });

    const reviewsWithBase64Images = reviews.map(review => {
      const reviewData = review.toJSON();
      if (reviewData.User && reviewData.User.userImage) {
        reviewData.User.userImage = Buffer.from(reviewData.User.userImage).toString('base64');
      }
      return reviewData;
    });

    res.json(reviewsWithBase64Images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAverageRatingByHelperId = async (req, res) => {
  const { helperId } = req.params;

  try {
    const result = await Review.findOne({
      where: { helperId },
      attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'averageRating']],
      raw: true,
    });

    if (result && result.averageRating !== null) {
      // Convert the average rating to an integer
      const averageRating = Math.floor(result.averageRating);
      res.json({ averageRating });
    } else {
      res.status(404).json({ error: 'No reviews found for the given helperId' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};