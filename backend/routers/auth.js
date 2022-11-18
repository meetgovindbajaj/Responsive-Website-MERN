const express = require("express");
const router = express.Router();
const hashing = require("bcryptjs");
require("../db/conn");
const User = require("../model/userSchema");
const authenticate = require("../middlewares/authenticate");

// router.get("/", (req, res) => {
//   return res.send(`router hello world from govind`);
// });

router.post("/Register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res
      .status(422)
      .json({ status: 422, error: "please fill all required field" });
  }

  try {
    const userEmailExist = await User.findOne({ email: email });
    const userPhoneExist = await User.findOne({ phone: phone });
    if (userEmailExist) {
      return res
        .status(422)
        .json({ status: 400, error: "Email already registered!" });
    } else if (userPhoneExist) {
      return res
        .status(422)
        .json({ status: 401, error: "Phone no. already registered!" });
    } else if (password != cpassword) {
      return res
        .status(422)
        .json({ status: 402, error: "passwords are not matching" });
    }
    const user = new User({ name, email, phone, work, password, cpassword }); //taking input
    await user.save(); //saving input
    res
      .status(201)
      .json({ status: 201, message: "user registered successfully" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/Login", async (req, res) => {
  let token;
  const { email, password } = req.body;
  res.send(email,password);
  if (!email || !password) {
    return res
      .status(422)
      .json({ status: 422, error: "please fill all required field" });
  }
  try {
    const userExist = await User.findOne({ email: email }); //checking email validation
    if (!userExist) {
      return res
        .status(422)
        .json({ status: 400, error: "invalid credentails" });
    } else {
      const isMatch = await hashing.compare(password, userExist.password); //checking password credentials
      token = await userExist.generateAuthToken();
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 2589200000),
        httpOnly: true,
      });
      if (!isMatch) {
        return res
          .status(422)
          .json({ status: 400, error: "invalid credentails" });
      } else {
        return res
          .status(200)
          .json({ status: 200, message: "login successful" });
      }
    }
  } catch (err) {
    return res.status(422).json(err);
  }
});

router
  .get("/About", authenticate, async (req, res) => {
    return res.send(req.rootUser);
  })
  .post("/About", authenticate, async (req, res) => {
    try {
      const {
        name,
        phone,
        work,
        experience,
        rate,
        project,
        eng,
        available,
        wapp,
        fb,
        insta,
        lin,
        ghub,
        yt,
      } = req.body;
      if (!name || !phone || !work) {
        return res
          .status(422)
          .json({ status: 422, error: "Please fill all the fields!" });
      }
      const userContact = await User.findOneAndUpdate(
        { _id: req.userID },
        {
          name,
          phone,
          work,
          experience,
          rate,
          project,
          eng,
          available,
          wapp,
          fb,
          insta,
          lin,
          ghub,
          yt,
        }
      );
      if (userContact) {
        await userContact.save();
        return res
          .status(201)
          .json({ status: 201, message: "Saved profile successfully" });
      } else {
        return res
          .status(422)
          .json({ status: 400, error: "Some Error Occured!" });
      }
    } catch (err) {
      console.log(err);
    }
  });

router.get("/Logout", (req, res) => {
  res.clearCookie("jwtoken", { path: "/" });
  return res.status(200).send("Logout Successful");
});

router.get("/getdata", authenticate, async (req, res) => {
  // console.log("data");
  return res.send(req.rootUser);
});

router.post("/Contact", authenticate, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
      return res
        .status(422)
        .json({ status: 422, error: "Please fill all the fields!" });
    }
    const userContact = await User.findOne({ _id: req.userID });
    if (userContact) {
      const userMessage = await userContact.addMessage(
        name,
        email,
        phone,
        message
      );
      await userContact.save();
      return res
        .status(201)
        .json({ status: 201, message: "message send successfully" });
    } else {
      return res
        .status(422)
        .json({ status: 400, error: "Some Error Occured!" });
    }
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
