const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Store hashed password
  role: { type: String, enum: ["superadmin", "admin"], default: "admin" },
});

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
