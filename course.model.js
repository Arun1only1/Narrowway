import mongoose from "mongoose";

// set rule
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 55,
  },
  price: {
    type: Number,
    required: true,
    min: 1,
  },
  duration: {
    //day
    type: Number,
    required: true,
    min: 1,
  },
});

// create table
export const Course = mongoose.model("Course", courseSchema);
