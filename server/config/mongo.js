const mongoose = require('mongoose');

exports.connectMongo = () => {
    mongoose
        .connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        .then(() => console.log('Database Connected!!'))
        .catch((err) => {
            console.log(err);
        });
};
