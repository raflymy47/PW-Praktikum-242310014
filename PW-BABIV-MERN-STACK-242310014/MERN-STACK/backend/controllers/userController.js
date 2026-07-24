const db = require("../models");
const User = db.User;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ======================================
// GET ALL USERS
// ======================================

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      order: [["created_at", "DESC"]],
    });

    res.json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

// ======================================
// GET USER BY ID
// ======================================

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      error: error.message,
    });
  }
};

// ======================================
// CREATE USER
// ======================================

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error creating user:", error);

    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors.map((e) => ({
          field: e.path,
          message: e.message,
        })),
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create user",
      error: error.message,
    });
  }
};





// ======================================
// UPDATE USER
// ======================================

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const { name, email, password } = req.body;

    await user.update({
      name: name || user.name,
      email: email || user.email,
      password: password || user.password,
    });

    res.json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error updating user:", error);

    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors.map((e) => ({
          field: e.path,
          message: e.message,
        })),
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update user",
      error: error.message,
    });
  }
};

// ======================================
// DELETE USER
// ======================================

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await user.destroy();

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error: error.message,
    });
  }
};




// ======================================
// LOGIN USER
// ======================================

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Cari user berdasarkan email
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Cocokkan password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Data user yang dikirim ke client
    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    // Generate JWT
    const expirationTime = Math.floor(Date.now() / 1000) + (6 * 60 * 60);

    const accessToken = jwt.sign(
      userResponse,
      process.env.JWT_SECRET,
      {
        expiresIn: "6h",
      }
    );

    res.json({
      success: true,
      message: "Login successful",
      data: userResponse,
      accessToken,
      expiresIn: expirationTime,
    });

  } catch (error) {
    console.error("Error during login:", error);

    res.status(500).json({
      success: false,
      message: "Failed to login",
      error: error.message,
    });
  }
};