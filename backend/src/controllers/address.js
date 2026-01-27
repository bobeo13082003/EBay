const { Address } = require("../models/address");


exports.createAddress = async (req, res) => {
    try {
        const userId = req.user.userId;
        const {
            fullName,
            phone,
            addressLine,
            city,
            country,
            isDefault,
        } = req.body;

        if (!fullName || !phone || !addressLine || !city || !country) {
            return res.status(400).json({
                message: "Missing required fields",
            });
        }

        const count = await Address.countDocuments({ user: userId });

        if (isDefault) {
            await Address.updateMany(
                { user: userId },
                { isDefault: false }
            );
        }

        const address = await Address.create({
            user: userId,
            fullName,
            phone,
            addressLine,
            city,
            country,
            isDefault: count === 0 ? true : !!isDefault,
        });

        return res.status(201).json({
            message: "Address created successfully",
            data: address,
        });
    } catch (err) {
        console.error("Create address error:", err);
        res.status(500).json({
            message: "Create address failed",
        });
    }
};

exports.getAddresses = async (req, res) => {
    try {
        const addresses = await Address.find({ userId: req.user.id })
            .sort({ isDefault: -1, createdAt: -1 });

        res.json({
            status: 200,
            data: addresses,
        });
    } catch (err) {
        res.status(500).json({
            message: "Get addresses failed",
        });
    }
};


exports.deleteAddress = async (req, res) => {
    try {
        const address = await Address.findOne({
            _id: req.params.id,
            userId: req.user.id,
        });

        if (!address) {
            return res.status(404).json({
                message: "Address not found",
            });
        }

        await address.deleteOne();

        res.json({
            status: 200,
            message: "Address deleted",
        });
    } catch (err) {
        res.status(500).json({
            message: "Delete address failed",
        });
    }
};


exports.updateDefault = async (req, res) => {
    const userId = req.user.userId;
    const addressId = req.params.id;

    await Address.updateMany(
        { user: userId },
        { isDefault: false }
    );

    await Address.findByIdAndUpdate(addressId, {
        isDefault: true,
    });

    res.json({ message: "Set default success" });
};

