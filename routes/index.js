const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');

const upload = multer({ dest: 'public/uploads/' });

router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));

router.get('/', userController.getPosts);
router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/post', userController.createPost);

router.get('/profile', userController.getProfile);
router.post('/profile', upload.single('profile_picture'), userController.updateProfile);

router.post('/like', userController.likePost);

module.exports = router;