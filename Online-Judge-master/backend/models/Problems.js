const mongoose = require("mongoose");
const problemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter problem name"],
  },
  tags: {
    type: String,
    required: [true, "Enter tags"],
  },
  description: {
    type: String,
    required: [true, "Enter description"],
  },
  difficulty: {
    type: String,
    required: [true, "Enter difficulty"],
  },
  hints: {
    type: String,
    required: [true, "Enter hints"],
  },
  constraints:{
    type: String, 
    required: [true, "Enter the constraints"],
  },
  showtc: {
    type: String,
    required: [true, "Enter 1-2 TC to show"],
  },
  showoutput: {
    type: String,
    required: [true, "Enter Output of those 1-2 TC to show"],
  },
  // Store test cases directly in MongoDB instead of Firebase links
  testCases: {
    type: String,
    required: [true, "Enter test cases"],
  },
  expectedOutput: {
    type: String,
    required: [true, "Enter expected output"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
problemSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Problem = mongoose.model("Problem", problemSchema);
module.exports = Problem;
