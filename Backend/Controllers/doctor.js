const { Doctor } = require("../Models/Doctor");
const { Hospital } = require("../Models/Hospital");

const addDoctor = async (req, res) => {
    try {
        const {
            doctorname,
            specialization,
            contact,
            email,
            availability,
            hospitalId
        } = req.body;

        const hospital = await Hospital.findById(hospitalId);
        if (!hospital) {
            return res.status(404).json({ message: 'Hospital not found' });
        }

        const newDoctor = await Doctor.create({
            doctorname,
            specialization,
            contact,
            email,
            availability,
            hospitalId
        });

        await Hospital.findByIdAndUpdate(hospitalId, {
            $push: { Doctors: newDoctor._id }
        });

        return res.status(201).json({
            message: 'Doctor added successfully',
            doctor: newDoctor
        });

    } catch (error) {
        console.error('Error in addDoctor:', error);
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {
    addDoctor
};
