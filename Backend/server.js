const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const admin = require("./models/AdminModel");
const employee = require("./models/EmployeeModel");
const task = require("./models/Task");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
mongoose.connect("mongodb://127.0.0.1:27017/empTaskManager");

app.get("/", (req, res) => {
  res.send("this is running");
});

// created for adding employees manually

// const temp = ["67d3e8647094d9f6f9511945"];

// app.get("/addEmp", async (req, res) => {
//   await employee.create({
//     username: "demsi",
//     email: "dem@me.com",
//     password: "123",
//     tasks: temp,
//   });
//   res.send("created");
// });

app.get("/getAdmin", async (req, res) => {
  const adminData = await admin.find();
  console.log(adminData);
  res.json(adminData);
});

app.get("/getEmp", async (req, res) => {
  const empData = await employee.find();
  console.log(empData);
  res.json(empData);
});

app.get("/employee/:id", async (req, res) => {
  try {
    const emp = await employee.findById(req.params.id).populate("tasks"); // Populate tasks later if needed
    if (!emp) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(emp);
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// checking valid employee name

app.get("/empcheck/:assignto", async (req, res) => {
  const employees = await employee.find();
  const nonExistent = employees.find(
    (emp) => emp.username === req.params.assignto
  );
  if (nonExistent) {
    res.json(1);
  } else {
    res.json(0);
  }
  // res.json(!nonExistent);
});

// assigning task to the employee

app.get(`/assignTask/:assignto/:taskId`, async (req, res) => {
  try {
    const { assignto, taskId } = req.params; // Extract params

    const updatedUser = await employee.findOneAndUpdate(
      { username: assignto }, // Find employee by username
      { $push: { tasks: taskId } }, // Add taskId to tasks array
      { new: true } // Return updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error assigning task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Updating the Status of the tasks

app.get("/updateTaskStatus/:taskId", async (req, res) => {
  try {
    // Find and update the task
    const updatedTask = await task.findByIdAndUpdate(
      req.params.taskId,
      { status: true }, // Assuming 'status' is the field you want to update
      { new: true } // Returns the updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task status updated", task: updatedTask });
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/addTask", async (req, res) => {
  const { title, date, assignTo, category, description } = req.body;
  const createdTask = await task.create({
    title,
    date,
    assignTo,
    category,
    description,
  });
  res.json(createdTask._id);
});

app.get("/getTasks", async (req, res) => {
  const allTasks = await task.find();
  res.json(allTasks);
});

app.listen(3000, () => {
  console.log("server is running on ${3000}");
});
