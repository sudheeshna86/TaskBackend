// controllers/taskController.js
import Task from "../models/Task.js";
import { createTaskSchema, updateTaskSchema } from "../validators/taskValidators.js";

const parseDate = (val) => {
  if (!val) return null;
  const d = new Date(val);
  return isNaN(d.getTime()) ? null : d;
};

export const getTasks = async (req, res) => {
  // Optional query support: status, priority, search, page, limit, sort
  const { status, priority, q, page = 1, limit = 50, sortBy = "createdAt", order = "desc" } = req.query;
  const filter = { user: req.user._id };
  if (status) filter.status = status;
  if (priority) filter.priority = priority;
  if (q) filter.title = { $regex: q, $options: "i" };

  const skip = (Math.max(1, Number(page)) - 1) * Number(limit);
  const sort = { [sortBy]: order === "asc" ? 1 : -1 };

  const tasks = await Task.find(filter).sort(sort).skip(skip).limit(Number(limit));
  const total = await Task.countDocuments(filter);

  res.json({ data: tasks, total });
};

export const getTask = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
};

export const createTask = async (req, res) => {
  const parse = createTaskSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ message: parse.error.errors.map(e=>e.message).join(", ") });

  const { title, description, priority = "low", status = "pending", dueDate } = parse.data;
  const due = parseDate(dueDate);

  const task = await Task.create({
    user: req.user._id,
    title,
    description,
    priority,
    status,
    dueDate: due
  });

  res.status(201).json(task);
};

export const updateTask = async (req, res) => {
  const parse = updateTaskSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ message: parse.error.errors.map(e=>e.message).join(", ") });

  const update = { ...parse.data };
  if (update.dueDate !== undefined) update.dueDate = parseDate(update.dueDate);

  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    update,
    { new: true }
  );

  if (!task) return res.status(404).json({ message: "Task not found or not authorized" });
  res.json(task);
};

export const deleteTask = async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!task) return res.status(404).json({ message: "Task not found or not authorized" });
  res.json({ message: "Task deleted" });
};
