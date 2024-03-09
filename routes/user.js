import express from "express";
import joi from "joi";
import User from "../Models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();

const userSchema = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  course: joi.string().required(),
  password: joi.string().min(8).required(),
  email: joi.string().email().min(8).required(),
  phoneNumber: joi.string().min(11).required(),
  Image: joi.string().required(),
});

router.post("/signup", async (req, res) => {
  // console.log(req.body.firstName);
  try {
    // console.log(req.body)
    // const {email,name,password} = req.body
    // const password = await bcrypt.hash(req.body.password, 10);

    await userSchema.validateAsync(req.body);
    const user = new User({ ...req.body });
    await user.save();
    const token = await jwt.sign({ _id: user.id, email: user.email }, "USAMA");
    res.status(200).send({
      status: "200 ok",
      usermessage: "user save successfuly",
      user,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({ status: "400", err: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;
    // console.log(email, password);
    if (email === "admin@gmail.com" && password === "123456789") {
      const token = await jwt.sign({ email }, "USAMA");
      res.status(200).send({
        status: "200 ok",
        user: "admin login successfuly",
        token,
      });
    } else {
      const user = await User.findOne({ email });

      // const Userpassowrd = await bcrypt.compare(password, user.password);
      // console.log(Userpassowrd);
      // console.log(password, user.password);
      if (!user) {
        res.setHeader("Content-Type", "application/json");

       return res.status(400).send({ message: "user not registered!" });
      }

      if (user && user.password === password) {
        const token = await jwt.sign(
          { _id: user.id, email: user.email },
          "USAMA"
        );
        res.status(200).send({
          status: "200 ok",
          user: "user login successfuly",
          token,
          id: user._id,
        });
      } else {
        res.setHeader("Content-Type", "application/json");
       return  res.status(400).send({ status: "400", user: "Wrong Password " });
      }
    }
  } catch (err) {
    console.log(err);
    res.setHeader("Content-Type", "application/json");
    return res.status(400).send({ status: "400", err: err.message });
  }
});

router.get("/getstudent/:id", async (req, res) => {
  try {
    const studentID = req.params.id;
    // console.log(studentID);

    const studentData = await User.findById(studentID);
    // console.log(studentData);
    return await res.status(200).send({
      staus: "200 ok",
      message: "single user given suceessfuly",
      studentData,
    });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

router.get("/allstudents", async (req, res) => {
  try {
    const allStudents = await User.find({});
    res.status(200).send({ staus: "200 ok", allStudents });
  } catch (error) {
    console.log(error);
   res.send(404).send({ message: "error", error });
  }
});

router.put("/updatestudent/:id", async (req, res) => {
  try {
    const studentID = req.params.id;

    const studentData = await User.findById(studentID);
    // console.log(studentData);
    // console.log(req.body);
    if (!studentData) {
      res.status(404).send({ messaage: "user not found" });
    }
    if (studentData) {
      const updateStudent = await User.findByIdAndUpdate(studentID, req.body, {
        new: true,
      });
      const allStudents = await User.find({});

      res.status(200).send({
        staus: "200 ok",
        message: "Student Update Successfuly",
        updateStudent,
        allStudents,
      });
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.delete("/deletestudent/:id", async (req, res) => {
  try {
    const studentID = req.params.id;
    const deleteStudent = await User.findByIdAndDelete(studentID);
    // console.log("deleteStudent--->", deleteStudent);
    res
      .status(200)
      .send({ message: "user deleted successfuly", deleteStudent });
  } catch (err) {
    res.status(404).send({ message: err.messaage });
  }
});

export default router;
