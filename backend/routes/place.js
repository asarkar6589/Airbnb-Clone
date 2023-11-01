const express = require('express');
const multer = require('multer');
const path = require('path');
const { uploadPhotos, uploadPhotosByLink, addPlace, getAllPlacesByUser, getPlaceById, updateDetails, deletePlace, getAllPlaces } = require('../controllers/place');

const router = express.Router();

const uploads = multer({ dest: "uploads" });

router.route("/upload-place-photos").post(uploads.array("photos", 100), uploadPhotos);
router.route("/upload-place-photos-by-link").post(uploadPhotosByLink);
router.route("/add-place").post(addPlace);
router.route("/places").get(getAllPlacesByUser);
router.route("/place/:id").get(getPlaceById);
router.route("/update/:id").put(updateDetails);
router.route("/delete/:id").delete(deletePlace);
router.route("/all-places").get(getAllPlaces);

module.exports = router;
