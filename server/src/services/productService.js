const Product = require("../models/product");

/***********************
 create Product
************************/

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

/***********************
 get Product
************************/

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
        business: user.business,
        isDeleted: false
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

/***********************
get Product By Id
************************/

const getProductById = async (user, id) => {
    const product = await Product.findOne({
        _id: id,
        business: user.business,
        isDeleted: false
    });

    if (!product) {
        throw new Error("Product not found.");
    }

    return product;
};

/***********************
 Update Product
************************/

const updateProduct = async (user, id, updateData) => {

    const allowedUpdates = [
        "name",
        "description",
        "category",
        "brand",
        "supplier",
        "costPrice",
        "sellingPrice",
        "sku",
        "barcode",
        "status"
    ];

    const product = await Product.findOne({
        _id: id,
        business: user.business,
        isDeleted: false
    });

    if (!product) {
        throw new Error("Product not found.");
    }

    const filter = {
        _id: id,
        business: user.business,
        isDeleted: false
    };
    
    const updates = Object.keys(updateData).filter((key) =>
        allowedUpdates.includes(key)
    );

    const filteredUpdates = {};

    for (const key of updates) {
        filteredUpdates[key] = updateData[key]
    }

    if (filteredUpdates.sku) {
        const existingSku = await Product.findOne({
            business: user.business,
            sku: filteredUpdates.sku,
            _id: {
                $ne: id
            }
        });

        if (existingSku) {
            throw new Error("SKU already exists.");
        }
    }

   

   if (filteredUpdates.barcode) {
        const existingBarcode = await Product.findOne({
            business: user.business,
            barcode: filteredUpdates.barcode,
            _id: {
                $ne: id
            }
        });

        if (existingBarcode) {
            throw new Error("Barcode already exists.");
        }
    }

    const updatedProduct = await Product.findOneAndUpdate(
        filter,
        filteredUpdates,
        {
            returnDocument: "after",
            runValidators: true
        }
    );

    return updatedProduct;
};

/***********************
 Delete Product
************************/

const deleteProduct = async (user, id) => {

    const product = await Product.findOne({
        business: user.business,
        _id: id,
        isDeleted: false
    });

    if (!product) {
        throw new Error("Product not found");
    }

    const filter = {
        _id: id,
        business: user.business,
        isDeleted: false
    };

    const deletedProduct = await Product.findOneAndUpdate(
        filter,
        {
            isDeleted: true,
            deletedAt: new Date()
        },
        {
            returnDocument: "after"
        }
    );

    return deletedProduct;
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};