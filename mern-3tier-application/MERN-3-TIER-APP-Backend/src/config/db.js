const mongoose = require("mongoose");

function buildMongoUri() {
  const host = process.env.MONGO_HOST || "localhost";
  const port = process.env.MONGO_PORT || "27017";
  const db = process.env.MONGO_DB || "appdb";
  const user = process.env.MONGO_USERNAME;
  const pass = process.env.MONGO_PASSWORD;

  // If user/pass provided -> auth enabled
  if (user && pass) {
    // authSource=admin because root user is created in admin db in official mongo image
    return `mongodb://${encodeURIComponent(user)}:${encodeURIComponent(pass)}@${host}:${port}/${db}?authSource=admin`;
  }

  // No auth
  return `mongodb://${host}:${port}/${db}`;
}

async function connectDB() {
  const uri = buildMongoUri();
  await mongoose.connect(uri);
  console.log("✅ MongoDB connected:", uri.replace(/:\/\/.*@/, "://***:***@"));
}

module.exports = { connectDB };
