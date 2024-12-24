const User = require("../models/User");

const getProfile = async (req, res) => {
    try {
        const user = req.user;
        const profile = await User.findById(user.id);
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.status(200).json({ name: profile.name, role: profile.role });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
};

module.exports = { getProfile };