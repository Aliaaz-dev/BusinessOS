const Joi = require("joi");

const createProductSchema = Joi.object({
    name: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
    sku: Joi.string().trim().required(),
    barcode: Joi.string().trim().optional(),
    category: Joi.string().optional(),
    supplier: Joi.string().optional(),
    brand: Joi.string().trim().optional(),
    costPrice: Joi.number().min(0).required(),
    sellingPrice: Joi.number().min(0).required(),
    currentStock: Joi.number().min(0).required(),
    reorderLevel: Joi.number().min(0).required(),
    unit: Joi.string().trim().required(),
    images: Joi.array().items(Joi.string()).optional(),
    attributes: Joi.object().optional()
});

module.exports = {
    createProductSchema
};