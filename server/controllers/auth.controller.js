import bcrypt from "bcryptjs";

import User from "../models/user.model.js";

export const loginUser = (req, res) => {
  res.json({
    message: "Login successful",
  });
};

export const signupUser = async (req, res) => {
  try {
    const { fullName, username, gender, confirmPassword, email, password } =
      req.body;

    if (
      !fullName ||
      !username ||
      !gender ||
      !confirmPassword ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        message: "Please enter all fields",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePicture = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePicture = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const user = await User.create({
      fullName,
      username,
      email,
      password: hashedPassword,
      gender,
      profilePicture:
        gender === "male" ? boyProfilePicture : girlProfilePicture,
    });

    if (user) {
      res.status(201).json({
        message: "User created successfully",
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        gender: user.gender,
        profilePicture: user.profilePicture,
      });
    } else {
      res.status(500).json({
        message: "Something went wrong, please try again later",
      });
    }
  } catch (error) {
    console.log("error in signup controller", error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const logoutUser = (req, res) => {
  res.json({
    message: "Logout successful",
  });
};
