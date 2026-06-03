import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: String,
    status: String,
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);