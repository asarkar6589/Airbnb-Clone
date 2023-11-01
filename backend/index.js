const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connection = require('./database/connection');
const userRouter = require('./routes/user');
const placeRouter = require('./routes/place');
const bookingRouter = require('./routes/booking');

dotenv.config({
    path: "./config.env"
});

connection();

const app = express();

app.use("/uploads", express.static(__dirname + "/uploads")); // We have written this so that we can access the images from the uploads folder by writng the url "http://localhost:5000/uploads/image_name"
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ["http://localhost:5174", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(userRouter);
app.use(placeRouter);
app.use(bookingRouter);


app.listen(process.env.PORT_NUMBER, () => {
    console.log(`Server is woking on port ${process.env.PORT_NUMBER}`);
});
