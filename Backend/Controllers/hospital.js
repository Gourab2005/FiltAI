const { Hospital } = require("../Models/Hospital");
const { User } = require("../Models/User");


const addHospital = async (req, res) => {
    const userId = req.user._id;
    try {
        const {
            hospitalname,
            location,
            hospitalhead,
            contact
        } = req.body;

        const newHospital = await Hospital.create({
            admin: userId,
            hospitalname,
            location,
            hospitalhead,
            contact
        });

        await User.findByIdAndUpdate(userId, {
            $push: { Hospitals: newHospital._id }
        });
        
        return res.status(201).json({
            message: 'Hospital added successfully',
            hospital: newHospital
        });

    } catch (error) {
        console.error('Error in addHospital:', error);
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {
    addHospital
};
