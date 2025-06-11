import mongoose from "mongoose";

// Replace <db_password> with your actual password and <db_name> with your database name
const atlasUri = `mongodb+srv://ShreyankGopal:${process.env.DB_PASS}@cropguard.evvz8qp.mongodb.net/CropGaurd?retryWrites=true&w=majority`;

mongoose.connect(atlasUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Additional options recommended for MongoDB Atlas:
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
})
.then(() => console.log("MongoDB Atlas connected"))
.catch(err => console.error("MongoDB Atlas connection error:", err));

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB Atlas");
});

export default db;