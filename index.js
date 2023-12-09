import express from "express";
import { dbConnect } from "./db.connect.js";
import studentRoutes from "./student.routes.js";
import courseRoutes from "./course.routes.js";

const app = express();

// to make app understand json
// json => Javascript Object Notation
app.use(express.json());

// connect db
dbConnect();

// register routes
app.use(studentRoutes);
app.use("/course", courseRoutes);

const port = 8000;

app.listen(port, () => {
  console.log(`App is listening in port ${port}`);
});
