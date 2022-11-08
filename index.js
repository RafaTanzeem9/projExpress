const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jasonwebtoken");
const app = express();

app.use(express.json());
mongoose
  .connect("mongodb://localhost:27017")
  .then(() => console.log("connected"))
  .catch((err) => console.error("not connected"));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPubliced: Boolean,
});
const Course = mongoose.model("Course", courseSchema);

app.post("/login", (req, res) => {
  const userName = req.body.userName;
  const name = { name: userName };
  jwt;
});

// async function getCourse() {
//   const courses = await Course.find({ isPubliced: true })
//     .sort({ name: 1 })
//     .select({ name: 1, author: 1 });
//   console.log(courses);
// }
// //getCourse();

// async function updateCourse(id) {
//   const course = await Course.findById(id);
//   if (!course) return;
//   course.isPubliced = true;
//   course.author = "tanzeem";
//   const result = await course.save();
//   console.log(result);
// }
// //updateCourse("6368c8156e123b6c70affef1");

// async function createCourse() {
//   const course = new Course({
//     name: "Ali",
//     author: "rafa",
//     tags: ["react", "backend"],
//     isPubliced: false,
//   });
//   const result = await course.save();
//   console.log(result);
// }
// //createCourse();

app.get("/", (req, res) => {
  res.send("Home!");
});

app.get("/api/courses", async (req, res) => {
  const courses = await Course.find();
  res.send(courses);
});

app.post("/api/courses", async (req, res) => {
  let course = new Course({
    name: req.body.name,
    author: req.params.author,
    tags: req.params.tags,
  });
  course = await course.save();
  res.send(course);
});

app.get("/api/courses/:id", (req, res) => {
  const course = Course.findById(req.params.id);
  if (!course) return res.status(404).send("not found course with that id");
  res.send(course);
});

app.put("/api/courses/:id", async (req, res) => {
  let course = await Course.findById(req.params.id);

  if (!course) return res.status(404).send("not found course with that id");
  course.name = req.body.name;
  course.isPubliced = true;
  course = await course.save();
  res.send(course);
});

app.delete("/api/courses/:id", async (req, res) => {
  const course = await Course.findByIdAndRemove(req.params.id);

  if (!course) return res.status(404).send("not found course with that id");

  res.send(course);
});

app.listen(3000);

console.log("listening 3000");
