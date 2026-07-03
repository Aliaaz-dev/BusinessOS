const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Business = require("../models/business");
const User = require("../models/user");

const register = async (data) => {
    const { business, owner } = data;

    // Check if business already exists
    const existingBusiness = await Business.findOne({
        $or: [
            { email: business.email },
            { phone: business.phone },
        ],
    });

    if (existingBusiness) {
        if (existingBusiness.email === business.email) {
            throw new Error("Business email already exists");
        }

        if (existingBusiness.phone === business.phone) {
            throw new Error("Business phone already exists");
        }
    }

    // Check if owner already exists
    const existingOwner = await User.findOne({
        $or: [
            { email: owner.email },
            { phone: owner.phone },
        ],
    });

    if (existingOwner) {
        if (existingOwner.email === owner.email) {
            throw new Error("Owner email already exists");
        }

        if (existingOwner.phone === owner.phone) {
            throw new Error("Owner phone already exists");
        }
    }

    // Start transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(owner.password, 10);

        // Create Business
        const createdBusiness = await Business.create(
            [business],
            { session }
        );

        const newBusiness = createdBusiness[0];

        // Create Owner
        const createdOwner = await User.create(
            [
                {
                    ...owner,
                    password: hashedPassword,
                    role: "owner",
                    business: newBusiness._id,
                },
            ],
            { session }
        );

        const newOwner = createdOwner[0];

        // Link Business to Owner
        newBusiness.owner = newOwner._id;
        await newBusiness.save({ session });

        // Commit transaction
        await session.commitTransaction();

        return {
            business: newBusiness,
            owner: newOwner,
        };

    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
};

const login = async (data) => {
    const { email, password } = data;

    const user = await User.findOne({ email }).populate("business");

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordCorrect) {
        throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
        {
            id: user._id,
            role: user.role,
            business: user.business._id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
        }
    );

    const userObject = user.toObject();
    delete userObject.password;

    return {
        message: "Login successful",
        token,
        user: userObject,
    };
};

module.exports = {
    register,
    login
};