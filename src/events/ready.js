require("dotenv").config();
const mongoose = require("mongoose");

const mongoURL = process.env.MONGO_URL;

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`✅ ${client.user.tag} is ready for some FUN`);

    // Connect to MongoDB
    if (mongoURL) {
      try {
        await mongoose.connect(mongoURL);
        console.log("🌐 I have connected to the database!");
      } catch (error) {
        console.error(
          "❌ I cannot connect to the database right now...",
          error
        );
      }
    }
  },
};
