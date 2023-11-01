const mongoose = require('mongoose');

const connection = () => {
    mongoose.connect(process.env.MONGO_URL, {
        dbName: "airbnb_clone"
    }).then(() => {
        console.log(`Database connceted`);
    }).catch((err) => {
        console.log(err);
    })
}

module.exports = connection;