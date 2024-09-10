// server.js (Express example)
const express = require("express");
const Metadata = require("./model/Metadata"); // Your Mongoose model
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors(["http://localhost:5173"]));

let metadata_id;

// Endpoint to create metadata
app.post("/api/metadata", async (req, res) => {
  const { name, symbol, description, image, externalUrl, animationUrl } =
    req.body;

  try {
    const metadata = new Metadata({
      name,
      symbol,
      description,
      image,
      externalUrl,
      animationUrl,
    });

    await metadata.save();

    // Generate a unique URI (e.g., based on the metadata ID)
    metadata_id = metadata._id;
    const uri = `http://localhost:3001/${metadata_id}`;

    res.status(201).json({ uri });
  } catch (error) {
    res.status(500).send("Error submitting metadata");
  }
});

// Endpoint to get metadata by userId
app.get("/api/metadata/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const metadata = await Metadata.findById(userId);

    if (metadata) {
      // Manually exclude fields
      const { _id, __v, ...filteredMetadata } = metadata.toObject();
      res.json(filteredMetadata);
    } else {
      res.status(404).send("Metadata not found");
    }
  } catch (error) {
    res.status(500).send("Error retrieving metadata");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
