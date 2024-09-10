// models/Metadata.js
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_DB_URL + "MetHost")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Failed to connect to MongoDB:", error));

const metadataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  symbol: { type: String },
  description: { type: String },
  image: { type: String },
  externalUrl: { type: String },
  animationUrl: { type: String },
});

module.exports = mongoose.model("Metadata", metadataSchema);
