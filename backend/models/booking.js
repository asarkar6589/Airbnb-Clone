const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    },
    placeId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Place"
    },
    placeName: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    guests: {
        type: Number,
        required: true,
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    },
    days: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const bookingModel = mongoose.model("Booking", bookingSchema);

module.exports = bookingModel;
