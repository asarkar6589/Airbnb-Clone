const express = require('express');
const multer = require('multer');
const path = require('path');
const { registerUser, profilePhoto, loginUser, getMyProfile, logOut } = require('../controllers/user');

const router = express.Router();

const upload = multer({ dest: "uploads" });

router.route('/register').post(registerUser);
router.route("/login").post(loginUser);
router.route("/profile-photo").post(upload.single("photo"), profilePhoto);
router.route("/my-profile").get(getMyProfile);
router.route("/logout").get(logOut);

module.exports = router;
