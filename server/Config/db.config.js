const mongoose = require("mongoose");

const connect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB bağlantısı başarılı --> ${conn.connection.name}`.blue.inverse);
    } catch (error) {
        console.error(`${error.message}`);
        process.exit(1);
    }
}

module.exports = connect;
