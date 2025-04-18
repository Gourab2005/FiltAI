const crypto = require('crypto');
const ApiData = require('../Models/ApiData');
const { User } = require('../Models/User');

const generateApiKey = async (req, res) => {
    try {
        const userId = req.user._id; 

        const apiKey = crypto.randomBytes(32).toString('hex');

        const apiData = new ApiData({
            user: userId,
            apiKey,
            subscriptionStartDate: new Date(),
            subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
            activationstatus: true
        });

        await apiData.save();

        await User.findByIdAndUpdate(userId, {
            $push: { Apidata: apiData._id }
        });        

        res.status(201).json({
            message: 'API key generated successfully',
            success: true,
            apiKey
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Failed to generate API key',
            error: err.message
        });
    }
};

module.exports = { generateApiKey };
