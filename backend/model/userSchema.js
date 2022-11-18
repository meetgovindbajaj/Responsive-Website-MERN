const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const hashing = require("bcryptjs");
const key = process.env.SECRET_KEY;
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  work: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
  },
  rate: {
    type: String,
  },
  project: {
    type: String,
  },
  eng: {
    type: String,
  },
  available: {
    type: String,
  },
  wapp: {
    type: String,
  },
  fb: {
    type: String,
  },
  insta: {
    type: String,
  },
  lin: {
    type: String,
  },
  ghub: {
    type: String,
  },
  yt: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  messages: [
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: Number,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
    },
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//hashing password starts
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashing.hash(this.password, 12);
    this.cpassword = await hashing.hash(this.cpassword, 12);
  }
  next();
});
//hashing password ends

//generating auth token starts
userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, key);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};
//generating auth token ends

//generating message starts
userSchema.methods.addMessage = async function (name, email, phone, message) {
  try {
    this.messages = this.messages.concat({ name, email, phone, message });
    await this.save();
    return this.messages;
  } catch (err) {
    console.log(err);
  }
};
//generating message ends

const User = mongoose.model("USERS", userSchema);
module.exports = User;
