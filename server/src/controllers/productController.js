const ProductService = require("../services/productService");

const createProduct = async (req, res) => {
    try {
        const product = await ProductService.createProduct(
            req.user,
            req.body
        );

        res.status(201).json({
            success: true,
            message: "Product created successfully.",
            data: product
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const getProducts = async (req, res) => {
    try {
        const result = await ProductService.getProducts(
            req.user,
            req.query
        );

        res.status(200).json({
            success: true,
            message: "Product retrieved successfully",
            data: result
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createProduct,
    getProducts
};