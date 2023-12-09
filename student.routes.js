import express from "express";

import { Student } from "./student.model.js";

const router = express.Router();

// create a student
router.post("/student/add", async (req, res) => {
  // extract new student from req.body
  const newStudent = req.body;

  //   handle email uniqueness

  //   check if user with email for newStudent already exists
  const student = await Student.findOne({ email: newStudent.email });

  //   if student exists, throw error
  if (student) {
    return res
      .status(409)
      .send({ message: "User with this email already exists in our system." });
  }

  //   create student
  try {
    await Student.create(newStudent);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }

  //   send appropriate response
  return res
    .status(200)
    .send({ message: "Student has been successfully added." });
});

// get single student details
router.get("/student/details/:id", async (req, res) => {
  const studentId = req.params.id;

  // const student = await Student.findOne({ _id: studentId });
  const student = await Student.findById(studentId);

  // if student not found

  if (!student) {
    return res.status(404).send({ message: "Student does not exist." });
  }

  return res.status(200).send(student);
});

// delete a user
router.delete("/student/delete/:id", async (req, res) => {
  const studentId = req.params.id;

  const student = await Student.findById(studentId);

  if (!student) {
    return res.status(404).send({ message: "Student does not exist." });
  }

  // await Student.deleteOne({ _id: studentId });
  await Student.findByIdAndDelete(studentId);

  return res.status(200).send({ message: "Student is removed successfully." });
});

// update a user
router.put("/student/update/:id", async (req, res) => {
  // extract student id from req.params
  const studentId = req.params.id;

  // extract new values from req.body
  const newValues = req.body;

  // check if student exists
  const student = await Student.findOne({ _id: studentId });

  // if not student, throw error
  if (!student) {
    return res.status(404).send({ message: "Student does not exist." });
  }

  // update student
  await Student.updateOne(
    { _id: studentId },
    {
      ...newValues,
    }
  );

  // send appropriate response
  return res.status(200).send({ message: "Student is updated successfully." });
});

// get multiple student

router.get("/student/list", async (req, res) => {
  // extract data from req.body
  const { limit, searchKey, page } = req.body;

  const skip = (page - 1) * limit;

  const studentList = await Student.aggregate([
    {
      $match: {
        name: { $regex: searchKey, $options: "i" },
      },
    },
    {
      $skip: skip,
    },
    { $limit: limit },
  ]);

  return res.status(200).send(studentList);
});
export default router;
