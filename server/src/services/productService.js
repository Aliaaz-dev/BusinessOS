const product = await ProductService.createProduct(req.user, req.body); 
const Product = require("../models/product");

const createProduct = async(user, productData) => {
    const {
    name,
    description,
    sku,
    barcode,
    category,
    supplier,
    brand,
    costPrice,
    sellingPrice,
    currentStock,
    reorderLevel,
    unit,
    images,
    attributes
    } = productData;

    // Check if product with the same SKU already exists
    const existingSku = await Product.findOne({
        business:user.business,
        sku
    });

    if(existingSku) {
        throw new Error("Product SKU already exists");;
    }

     // Check if product with the same barcode already exists    
    if (barcode) {
        const existingBarcode = await Product.findOne({
            business: user.business,
            barcode
        });

        if (existingBarcode) {
            throw new Error("Product barcode already exists.");
        }
    }

    // Create new product
    const product = new Product ({
        business: user.business,
        createdBy: user._id,
        name,
        description,
        sku,
        barcode,
        category,
        supplier,
        brand,
        costPrice,
        sellingPrice,
        currentStock,
        reorderLevel,
        unit,
        images,
        attributes
    });

    await product.save();

    return product;
    
};    

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    archiveProduct
};