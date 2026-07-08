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
            message: error.message
        });
    }
};