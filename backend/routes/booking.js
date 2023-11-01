const express = require('express');
const { newBokking, getBookingsByPerson, getSingleBookingByID, deleteBooking } = require('../controllers/booking');

const router = express.Router();

router.route("/new/booking/:id").post(newBokking);
router.route("/bookings").get(getBookingsByPerson);
router.route("/booking/:id").get(getSingleBookingByID).delete(deleteBooking);

module.exports = router;
