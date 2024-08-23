// routes/helpers.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const helperController = require('../controllers/helperController');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/createHelper', upload.single('helperImage'), helperController.createHelper);
router.get('/getHelpers', helperController.getAllHelpers);
router.get('/getHelpersByType/:workType', helperController.getHelpersByType);
router.get('/getHelper/:helperId', helperController.gethelperById);
router.put('/updateHelperInfo/:helperId', upload.none(), helperController.updateHelperInformation);

router.post('/postReview', helperController.createHelperReview);
router.get('/getReviews/:helperId', helperController.getReviewsByHelperId);
router.get('/getRating/:helperId', helperController.getAverageRatingByHelperId);

module.exports = router;
