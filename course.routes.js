import express from "express";
import { Course } from "./course.model.js";
import * as Yup from "yup";
import { checkMongoIdValidity } from "./utils.js";

const router = express.Router();

// add course
router.post("/add", async (req, res) => {
  const newCourse = req.body;

  let courseSchema = Yup.object({
    name: Yup.string()
      .required()
      .trim()
      .min(1, "Name must be at least 1 character.")
      .max(55, "Name must be at most 55 characters."),
    price: Yup.number().min(1, "Price must be at least 1 dollar.").required(),
    duration: Yup.number()
      .min(1, "Duration must be at least 1 day.")
      .required(),
  });

  try {
    await courseSchema.validate(newCourse);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }

  await Course.create(newCourse);

  return res.status(200).send({ message: "Course is added successfully." });
});

// get course details
router.get("/details/:id", async (req, res) => {
  const courseId = req.params.id;

  //   validate for mongo id
  const isValid = checkMongoIdValidity(courseId);

  //   if not valid mongo id
  if (!isValid) {
    return res.status(400).send({ message: "Invalid course id." });
  }

  //   find course
  const course = await Course.findOne({ _id: courseId });

  //   if not course
  if (!course) {
    return res.status(404).send({ message: "Course does not exist." });
  }

  //   send appropriate response
  return res.status(200).send(course);
});

// delete a course

router.delete("/delete/:id", async (req, res) => {
  const courseId = req.params.id;

  //   validate for mongo id
  const isValid = checkMongoIdValidity(courseId);

  //   if not valid mongo id
  if (!isValid) {
    return res.status(400).send({ message: "Invalid course id." });
  }

  //   find course
  const course = await Course.findOne({ _id: courseId });

  //   if not course
  if (!course) {
    return res.status(404).send({ message: "Course does not exist." });
  }

  await Course.deleteOne({ _id: courseId });

  return res.status(200).send({ message: "Course is removed successfully." });
});

export default router;
