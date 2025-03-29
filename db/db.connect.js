const mongoose = require("mongoose");

const initializeConnectionToDb = async () => {
  await mongoose
    .connect(process.env.DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log("Successfully connected to db"))
    .catch((error) => console.error("mongoose connection failed", error));
};

module.exports = initializeConnectionToDb;
