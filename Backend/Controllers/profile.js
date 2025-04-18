const { User } = require('../Models/User');

const profile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password').populate('Apidata').populate('Hospitals'); 
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            message: 'Profile fetched successfully',
            success: true,
            user
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}
module.exports = profile;
