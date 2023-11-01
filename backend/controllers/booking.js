const jwt = require('jsonwebtoken');
const bookingModel = require('../models/booking');
const placeModel = require('../models/place');

exports.newBokking = async (req, res) => {
    try {
        const { id } = req.params;
        const { token } = req.cookies;

        if (!token) {
            return res.json({
                success: false,
                message: 'Please Login To Your Account.'
            });
        }

        const place = await placeModel.findById(id);

        const placeName = place?.title;

        const photo = place?.photos[0];

        const owner = jwt.decode(token);

        const { name, email, phone, guests, checkInDate, checkOutDate, days, price } = req.body;

        const booking = await bookingModel.create({
            owner,
            placeId: id,
            placeName,
            photo,
            name,
            email,
            phone,
            guests,
            checkIn: checkInDate,
            checkOut: checkOutDate,
            days,
            price
        });

        res.json({
            success: true,
            message: 'You have successfully booked your place',
        });

    } catch (error) {
        res.json(error);
    }
}

exports.getBookingsByPerson = async (req, res) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.json({
                success: false,
                message: 'Please Login To Your Account.'
            });
        }

        const owner = jwt.decode(token);

        const bookings = await bookingModel.find({ owner });

        res.json({
            success: true,
            bookings
        })
    } catch (error) {
        res.json(error);
    }
}

exports.getSingleBookingByID = async (req, res) => {
    try {
        const { id } = req.params;

        const booking = await bookingModel.findById(id);

        const placeId = booking?.placeId;

        const place = await placeModel.findById(placeId);

        if (!booking) {
            return res.json({
                success: false,
                message: `No such booking existis`
            });
        }

        res.json({
            success: true,
            booking,
            place
        })
    } catch (error) {
        res.json(error);
    }
}

exports.deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;

        const booking = await bookingModel.findById(id);

        await bookingModel.deleteOne(booking);

        res.json({
            success: true,
            message: `Your booking with id no ${id} has been deleted successfully !`
        })
    } catch (error) {
        res.json(error);
    }
}
