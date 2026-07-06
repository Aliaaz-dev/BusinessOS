const authService = require("../services/authServices");

const register = async (req, res) => {
    try {
        const result = await authService.register(req.body);

        res.status(201).json(result);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const login = async (req, res) => {
    try {
        const result = await authService.login(req.body);

        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getMe = async (req, res) => {
    res.status(200).json({
        user: req.user,
    });
};

module.exports = {
    register,
    login,
    getMe,
};