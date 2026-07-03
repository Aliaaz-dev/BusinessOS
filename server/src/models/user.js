const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },

    middleName: {
      type: String,
      trim: true,
    },

    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      trim: true,
    },

    password: {
       type: String,
       required: [true, "Password is required"],
       minlength: [10, "Password must be at least 10 characters long"],
       select: false
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },


    role: {
      type: String,
      enum: ["owner", "manager", "employee"],
      default: "owner",
    },

    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: [true, "A user must be linked to a business"] 
    },

    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);