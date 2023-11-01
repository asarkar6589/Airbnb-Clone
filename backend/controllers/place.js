const imageDownloader = require('image-downloader');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const placeModel = require('../models/place');

exports.uploadPhotos = (req, res) => {
    // console.log(req.files);
    const uploadPhotos = [];

    for (let index = 0; index < req.files.length; index++) {
        const { path, originalname } = req.files[index];
        // console.log(path);

        // Since original name contains the whole name with extension and since it is a string, we will split it, now parts is an array. So the extension will be in the last part.
        const parts = originalname.split('.');
        const extension = parts[parts.length - 1];
        const newPath = path + '.' + extension;
        fs.renameSync(path, newPath);
        uploadPhotos.push(newPath.match(/[^\\]+$/)[0]);
    }

    res.json(uploadPhotos);
}

exports.uploadPhotosByLink = async (req, res) => {
    const { photoLink } = req.body;
    const newName = "photo" + Date.now() + ".jpg";
    // console.log(photoLink);
    await imageDownloader.image({
        url: photoLink,
        dest: __dirname + '/uploads'
    })

    res.json('ok')
}

exports.addPlace = async (req, res) => {
    try {
        const { title, address, addedPhotos, description, checkedItems, extraInfo, checkIn, checkOut, maxGuests, price } = req.body;

        const { token } = req.cookies;
        const id = jwt.decode(token);
        const user = await userModel.findById(id);

        const place = await placeModel.create({
            owner: user._id,
            title,
            address,
            photos: addedPhotos,
            description,
            perks: checkedItems,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price
        });

        res.json(place);
    } catch (error) {
        res.json(error);
    }
}

exports.getAllPlacesByUser = async (req, res) => {
    try {
        const { token } = req.cookies;
        const id = jwt.decode(token);

        const places = await placeModel.find({ owner: id });

        res.json(places);
    } catch (error) {
        res.json(error);
    }
}

exports.getPlaceById = async (req, res) => {
    try {
        const { id } = req.params;

        // console.log(id);

        const place = await placeModel.findById(id);

        res.json(place);
    } catch (error) {
        res.json(error);
    }
}

exports.updateDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const place = await placeModel.findById(id);

        const { title, address, addedPhotos, description, checkedItems, extraInfo, checkIn, checkOut, maxGuests, price } = req.body;

        const result = await placeModel.updateOne(place, { $set: { title: title, address: address, photos: addedPhotos, description: description, perks: checkedItems, extraInfo: extraInfo, checkIn: checkIn, checkOut: checkOut, maxGuests: maxGuests, price: price } });

        res.json({
            sucess: true,
            message: `Your Place is updated`
        });
    } catch (error) {
        res.json({
            sucess: false,
            message: `Failed to update your place. Please try again later ! 🤧`
        })
    }
}

exports.deletePlace = async (req, res) => {
    try {
        const { id } = req.params;

        const place = await placeModel.findById(id);

        await placeModel.deleteOne(place);

        res.json({
            sucess: true,
            message: `Your Place is deleted`
        });
    } catch (error) {
        res.json({
            sucess: false,
            message: `Failed to update your place. Please try again later ! 🤧`
        })
    }
}

exports.getAllPlaces = async (req, res) => {
    try {
        const placeDoc = await placeModel.find();
        res.json(placeDoc);
    } catch (error) {
        res.json(`Error Occured`);
    }
}