const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Business name is required"],
        trim: true
    },

    businessType: {
        type: String,
        enum: [
           "Retail",
           "Restaurant",
           "Pharmacy",
           "Supermarket",
           "Electronics",
           "Wholesale",
           "Manufacturing",
           "Service",
           "Fashion",
           "Healthcare",
           "Education",
           "Other"
    ],
    required: [true, "Business type is required"]
    },

    email: {
        type: String,
        required: [true, "Business email is required"],
        unique: true,
        lowercase: true,
        trim: true
    },

    phone: {
        type: String,
        required: [true, "Business phone number is required"],
        trim: true,
        unique: true
    },

    address: {
        country: { type: String, required: true, trim: true },
        state: { type: String, required: true, trim: true },
        city: { type: String, required: true, trim: true },
        street: { type: String, required: true, trim: true },
        zipCode: { type: String, required: true, trim: true }            
    },
    
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    status: {
        type: String,
        enum: ["active", "inactive", "suspended"],
        default: "active"
    },

    plan: {
        type: String,
        enum: ["free", "starter", "professional", "enterprise"],
        default: "free"
    },   

    settings: {
        currency: { type: String, default: "NGN" },
        timezone: { type: String, default: "Africa/Lagos" },
        language: { type: String, default: "en" }
    }
}, { timestamps: true });


module.exports = mongoose.model("Business", businessSchema);