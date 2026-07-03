const authService = require("../services/auth.service");

const register = async (req, res) => {
    try {
        const result = await authService.register(req.body);

        return res.status(201).json(result);

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });

    }
};

const login = async (data) => {
    const { email, password } = data;

    // Find user
    const user = await User.findOne({ email }).populate("business");

    if (!user) {
        throw new Error("Invalid email or password");
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordCorrect) {
        throw new Error("Invalid email or password");
    }

    // Remove password before returning
    const userObject = user.toObject();
    delete userObject.password;

    return {
        message: "Login successful",
        user: userObject,
    };
};

module.exports = {
    register,
    login
};