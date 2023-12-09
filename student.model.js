import mongoose from "mongoose";

// set rules
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 55,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    min: 16,
    max: 100,
    required: true,
  },

  email: {
    type: String,
    minlength: 5,
    maxlength: 55,
    required: true,
    trim: true,
    unique: true,
  },

  phoneNumber: {
    type: String,
    maxlength: 10,
    required: false,
    trim: true,
  },
});

// create table

export const Student = mongoose.model("Student", studentSchema);
