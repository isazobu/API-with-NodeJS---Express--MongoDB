const mongoose = require('mongoose');

let uri = 'mongodb://localhost/E-Commerce';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

mongoose.connection.on('connected', () => {
    console.log("==========================")
    console.log("==========================")
    console.log(`CONNECTED DATABASE URİ : ${uri}`)
    console.log("==========================")
    console.log("==========================")
})

const shutdown = (msg, callback) => {
    mongoose.connection.close(() => {
        console.log(`Mongoose disconnected through ${msg}`);
        callback();
    });
};



process.once('SIGUSR2', () => {
    shutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});


process.on('SIGINT', () => {
    shutdown('app termination', () => {
        process.exit(0);
    });
});


process.on('SIGTERM', () => {
    shutdown('Heroku app shutdown', () => {
        process.exit(0);
    });
});


require('./User.js');
require('./passport');