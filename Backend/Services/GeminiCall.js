const axios = require('axios');
require('dotenv').config();

async function CallGemini(userData) {
  const { symptoms, doctors } = userData;

  const apiKey = process.env.GEMINI_API_KEY;
  const endpoint = process.env.GEMINI_ENDPOINT;

  if (!apiKey || !endpoint) {
    throw new Error("Missing Gemini API key or endpoint in .env file.");
  }

  try {
    // 1. Predict Disease
    const diseasePrompt = `You are a medical AI. Based on the symptoms below, return ONLY the most likely disease name.\nSymptoms: ${symptoms}`.trim();

    const diseaseResponse = await axios.post(
      `${endpoint}?key=${apiKey}`,
      {
        contents: [{ role: "user", parts: [{ text: diseasePrompt }] }],
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const predicted_disease = diseaseResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    // 2. Find Doctor
    const doctorsList = Object.values(doctors);

    const doctorPrompt = `You are a medical AI assistant. Based on the disease "${predicted_disease}", select the most relevant doctor from the list below. Each doctor has an id, name, and speciality. Return ONLY the "id" of the best matching doctor based on speciality.\nDoctors:\n${JSON.stringify(doctorsList, null, 2)}`.trim();

    const doctorResponse = await axios.post(
      `${endpoint}?key=${apiKey}`,
      {
        contents: [{ role: "user", parts: [{ text: doctorPrompt }] }],
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const doctor_id = doctorResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    // 3. Home Remedy
    const remedyPrompt = `You are a medical AI. For the disease "${predicted_disease}", return only ONE line of home remedy. No explanation.`.trim();

    const remedyResponse = await axios.post(
      `${endpoint}?key=${apiKey}`,
      {
        contents: [{ role: "user", parts: [{ text: remedyPrompt }] }],
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const remedy = remedyResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    return {
      predicted_disease,
      doctor_id,
      remedy,
    };

  } catch (err) {
    console.error("Gemini AI error:", err.response?.data || err.message);
    throw err;
  }
}

module.exports = { CallGemini };
