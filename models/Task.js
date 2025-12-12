// models/Task.js
import mongoose from "mongoose";

const PRIORITIES = ["low", "medium", "high"];
const STATUSES = ["pending", "inprogress", "completed"];

const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  priority: { type: String, enum: PRIORITIES, default: "low" },
  status: { type: String, enum: STATUSES, default: "pending" },
  dueDate: { type: Date, default: null }
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);
