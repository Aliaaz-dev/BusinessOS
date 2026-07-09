const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const validate = require("../middleware/validate");
const ProductController = require("../controllers/productController");
const {
    createProductSchema,
} = require("../validators/productValidator");


router.post(
    "/",
    authMiddleware,
    roleMiddleware("owner", "manager"),
    validate(createProductSchema),
    ProductController.createProduct
);

// router.get(
//     "/",
//     authMiddleware,
//     ProductController.getProducts
// );

// router.get(
//     "/:id",
//     authMiddleware,
//     ProductController.getProductById
// );

// router.put(
//     "/:id",
//     authMiddleware,
//     roleMiddleware("owner", "manager"),
//     validate(updateProductSchema),
//     ProductController.updateProduct
// );

// router.patch(
//     "/:id/archive",
//     authMiddleware,
//     roleMiddleware("owner"),
//     ProductController.archiveProduct
// );

module.exports = router;