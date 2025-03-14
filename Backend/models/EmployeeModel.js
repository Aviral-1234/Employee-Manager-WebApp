const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Store hashed password
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "task" }], // Storing task IDs only
});

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
