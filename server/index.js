import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import Task from "./models/Task.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// ------------------------------------------------------------------------------------

// fetch all the tasks
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json(tasks);
});

// create a new task
app.post("/tasks", async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
});

// update tasks like [done, pending, progress]
app.put("/tasks/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(task);
});

// delete a task
app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);

  res.json({ message: "Deleted" });
});

// ------------------------------------------------------------------------------------

app.listen(5000, () => {
  console.log("Server running on port 5000");
});