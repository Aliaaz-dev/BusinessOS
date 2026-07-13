const Product = require("../models/product");

{/* ------------------------------Create Product---------------------------------------- */}

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

{/* ---------------------------------Get Products---------------------------------------- */}

const getProducts = async (user, query) => {
    const {
    page = "1",
    limit = "10",
    search = "",
    status = "",
    sort = "",
    order = "desc"
    } = query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);


    const filter = {
        business: user.business
    };

    if (status) {
        filter.status = status;
    }

    if (search) {
        filter.$or = [
            { name: { $regex: search, $options: "i" } },
            { sku: { $regex: search, $options: "i" } },
            { barcode: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } }
        ];
    }

    const sortFields = {
        name: "name",
        price: "sellingPrice",
        stock: "currentStock",
        created: "createdAt"
    };

    const sortOrder = order === "desc" ? -1: 1;

    const sortOption = {
        [sortFields[sort] || "createdAt"]: sortOrder
    };

    const products = await Product.find(filter)
        .sort(sortOption)
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber);

    const totalProducts = await Product.countDocuments(filter);

    return {
        products,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalProducts / limitNumber),
        totalProducts
    };
};

module.exports = {
    createProduct,
    getProducts,
    // getProductById,
    // updateProduct,
    // archiveProduct
};