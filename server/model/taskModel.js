import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },
    
    description: {
      type: String,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    estimatedStartDate: {
      type: Date,
    },
    estimatedEndDate: {
      type: Date,
    },
    assignedTo: {
      type: mongoose.ObjectId,
      ref: "users",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    attachment: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("tasks", taskSchema);
