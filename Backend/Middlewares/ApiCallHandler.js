const ApiData = require('../Models/ApiData');
const { Hospital } = require('../Models/Hospital');
const { User } = require('../Models/User');
const { CallGemini } = require('../Services/GeminiCall');

const ApiCallHandler = async (req, res, next) => {
    try {
        const apiKey = req.header('x-api-key');
        if (!apiKey) {
            return res.status(400).json({ message: 'API key is required' });
        }

        const apiData = await ApiData.findOne({ apiKey });

        if (!apiData) {
            return res.status(404).json({ message: 'API key not found' });
        }

        if (apiData.apicallCount >= apiData.limit) {
            return res.status(429).json({ message: 'API call limit exceeded' });
        }

        apiData.apicallCount += 1;
        apiData.lastCalled = new Date();

        await apiData.save();

        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// const callAPI = async (req, res) => {
//     try {
//         const { symptoms, doctors } = req.body;

//         if (!symptoms || !doctors) {
//             return res.status(400).json({ message: 'Missing required fields: symptoms and doctors' });
//         }

//         const result = await CallGemini({ symptoms, doctors });

//         return res.status(200).json({
//             message: 'API call successful',
//             success: true,
//             data: result
//         });

//     } catch (err) {
//         console.error("Error calling Gemini:", err.message);
//         return res.status(500).json({
//             success: false,
//             message: 'Error calling Gemini AI',
//             error: err.message
//         });
//     }
// };
const callAPI = async (req, res) => {
    try {
        const { symptoms } = req.body;
        const { hospitalId } = req.query;

        if (!symptoms) {
            return res.status(400).json({ message: 'Missing required field: symptoms' });
        }

        if (!hospitalId) {
            return res.status(400).json({ message: 'Missing hospital ID in query parameter' });
        }

        const apiKey = req.header('x-api-key');
        if (!apiKey) {
            return res.status(400).json({ message: 'Missing API key' });
        }

        // 1. Get the ApiData by API key
        const apiData = await ApiData.findOne({ apiKey });
        if (!apiData) {
            return res.status(404).json({ message: 'Invalid API key' });
        }

        // 2. Find user by ApiData reference
        const user = await User.findOne({ Apidata: apiData._id });
        if (!user) {
            return res.status(404).json({ message: 'User not found for API key' });
        }

        // 3. Find hospital under user
        const hospital = await Hospital.findOne({ _id: hospitalId, admin: user._id });
        if (!hospital) {
            return res.status(404).json({ message: 'Hospital not found or not associated with the user' });
        }

        // 4. Populate doctors from the hospital
        const populatedHospital = await hospital.populate('Doctors');
        const doctorsArray = populatedHospital.Doctors.map(doc => ({
            id: doc._id.toString(),
            name: doc.doctorname,
            speciality: doc.specialization
        }));

        if (doctorsArray.length === 0) {
            return res.status(404).json({ message: 'No doctors found for this hospital' });
        }

        // 5. Call Gemini with doctors + symptoms
        const result = await CallGemini({
            symptoms,
            doctors: doctorsArray.reduce((acc, doc) => {
                acc[doc.id] = doc;
                return acc;
            }, {})
        });

        const doctorDetails = doctorsArray.find(doc => doc.id === result.doctor_id);


        return res.status(200).json({
            message: 'API call successful',
            success: true,
            data: {
                predicted_disease: result.predicted_disease,
                remedy: result.remedy,
                doctor: doctorDetails
            }
        });


    } catch (err) {
        console.error("Error calling Gemini:", err.message);
        return res.status(500).json({
            success: false,
            message: 'Error calling Gemini AI',
            error: err.message
        });
    }
};


module.exports = { ApiCallHandler, callAPI };
