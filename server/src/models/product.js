const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Business",
        required: true,
        index: true
    },
    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
        trim: true
    },
    sku: {
        type: String,
        required: [true, "Product SKU is required"],
        trim: true
    },
    barcode: {
        type: String,
        trim: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Product category is required"]
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier",
        required: [true, "Product supplier is required"],
    },
    brand: {
        type: String,
        trim: true
    },
    costPrice: {
        type: Number,
        required: [true, "Product cost price is required"],
        min: [0, "Cost price cannot be negative"]
    },
    sellingPrice: {
        type: Number,
        required: [true, "Product selling price is required"],
        min: [0, "Selling price cannot be negative"]
    },
    currentStock: {
        type: Number,
        required: [true, "Current stock is required"],
        min: [0, "Stock cannot be negative"]
    },
    reorderLevel: {
        type: Number,
        required: [true, "Reorder level is required"],
        min: [0, "Reorder level cannot be negative"]
    },
    unit: {
        type: String,
        required: [true, "Product unit is required"],
        trim: true
    },
    images: {
        type: [String],
        default: []
    },
    status: {
        type: String,
        enum: ["active", "out_of_stock", "archived"],
        default: "active"
    },
    attributes: {
        type: Map,
        of: mongoose.Schema.Types.Mixed,
        default: {}
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true});

productSchema.index({ business: 1, sku: 1 }, { unique: true});

productSchema.index(
    { business: 1, barcode: 1 }, 
    { unique: true, sparse: true});

// productSchema.index({ business: 1, name: 1}); 

module.exports = mongoose.model("Product", productSchema);