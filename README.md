
# 🏥 FiltAI – AI-powered Medical API SaaS Platform

## 📑 Table of Contents
- [📝 Description](#-description)
- [🚨 Problem Statement](#-problem-statement)
- [💡 Solution](#-solution)
- [⚙️ Technical Setup](#-technical-setup)
- [🧱 Tech Stack](#-tech-stack)
- [📡 API Overview](#-api-overview)
- [📦 Use Cases](#-use-cases)
- [🚀 Future Improvements](#-future-improvements)
- [👨‍⚕️ Contact & Contribution](#-contact--contribution)

---

## 📝 Description

**FiltAI** is a **SaaS platform** offering **AI-powered APIs** to enhance medical service delivery and doctor-patient matchmaking. Admins can:

- Add hospitals and register doctors
- Generate secure API keys
- Use APIs to fetch predictions, recommend doctors, and suggest remedies
- Track API usage, performance, and subscriptions

---

## 🚨 Problem Statement

The healthcare system lacks real-time, symptom-based solutions for patients and hospitals. Finding the right doctor or diagnosis often involves delays and manual effort, which could be optimized with AI-powered APIs.

---

## 💡 Solution

FitAI offers:
- A fast, secure backend for managing hospitals and doctors
- AI-powered API for disease prediction and doctor matching
- Multi-language support for symptoms
- API key system for integration into any frontend or mobile platform
- Subscription handling and analytics for admins

---

## 🧭 User Workflow

Here's how an admin can use the FitAI platform step-by-step:

1. **🔐 Login to the Platform**
   - Navigate to the FitAI dashboard.
   - Log in using your admin credentials.

2. **🔑 Generate API Key**
   - Go to the **API Settings** section.
   - Click **Generate API Key** – this is required before any API calls or subscriptions.

3. **🏥 Add Hospitals**
   - Go to the **Hospitals** section.
   - Add a new hospital by providing name, location, head doctor, and contact.

4. **👨‍⚕️ Add Doctors under Hospitals**
   - Select a hospital.
   - Add doctors by providing specialization, availability, contact info, etc.

5. **📡 Use API Endpoint**
   - Now that hospitals and doctors are added, use the AI API:
     ```
     GET /api/service/AgentResponse?hospitalId=<HOSPITAL_ID>
     ```
   - Pass the API key in the header:
     ```
     x-api-key: <YOUR_API_KEY>
     ```

6. **🏗️ Integrate Into Frontend**
   - You can now plug this API into **any hospital’s website or frontend**.
   - Patients enter symptoms → AI suggests doctor + remedy.

7. **💳 Subscribe to Premium**
   - Head over to the **Subscription** section on the dashboard.
   - You must **generate an API key before subscribing**.
   - Choose a plan and complete payment via **Cashfree**.

8. **📊 Monitor Usage**
   - View how many API calls have been made.
   - Track remaining calls, renew subscriptions, and upgrade plans.

> 🧠 The AI works **hospital-wise**, so each hospital's doctors are matched separately.

---

## ⚙️ Technical Setup

### 🧪 Backend Setup

```bash
# Go to the backend folder
cd backend

# Install backend dependencies
npm install
```

### 📁 .env File Configuration

> Create a `.env` file in the backend root directory and paste the following:

```env
PORT=3000
WT_SECRET=your_jwt_secret
CASHFREE_APP_ID=your_cashfree_app_id
CASHFREE_SECRET_KEY=your_cashfree_secret_key
GEMINI_API_KEY=your_gemini_api_key
GEMINI_ENDPOINT=your_gemini_endpoint_url
```

### 🚀 Start the Backend Server

```bash
npm run start
```

### 🌐 Ngrok for Webhook Testing

Use **ngrok** to expose your local server for webhook testing.

```bash
ngrok http 3000
```

Set the webhook URL in your **Cashfree dashboard** like this:

```
https://your-ngrok-url/api/cashfree/webhook
```

_Example:_
```
https://abcd1234.ngrok.io/api/cashfree/webhook
```

---

## 🧱 Tech Stack

| Layer         | Technology                |
|---------------|----------------------------|
| Frontend      | React (Vite), Tailwind CSS |
| Backend       | Node.js, Express.js        |
| Database      | MongoDB                    |
| Authentication| JWT                        |
| Payments      | Cashfree Gateway           |
| AI Engine     | Gemini AI API              |
| Tools         | Postman, Ngrok             |

---

## 📡 API Overview

> 🔐 All secure routes require a JWT token in the header:

```http
Authorization: <JWT_TOKEN>
```

> 🔑 For diagnosis API calls, use:

```http
x-api-key: <YOUR_API_KEY>
```

### ✨ Endpoints Summary

| Method | Endpoint                                  | Description                             |
|--------|-------------------------------------------|-----------------------------------------|
| POST   | `/api/user/signup`                        | Register new admin                      |
| POST   | `/api/user/login`                         | Login admin and get JWT                 |
| GET    | `/api/user/profile`                       | View admin profile                      |
| POST   | `/api/user/addHospital`                   | Add a hospital                          |
| POST   | `/api/user/adddoctor`                     | Add a doctor to a hospital              |
| POST   | `/api/service/generate-api`               | Generate API key                        |
| POST   | `/api/service/subscribe`                  | Cashfree subscription                   |
| GET    | `/api/service/AgentResponse?hospitalId=`  | AI-powered diagnosis + doctor match     |

### 🧠 Diagnosis API Example

```http
GET /api/service/AgentResponse?hospitalId=68026da649ad1088d5a30603

Headers:
x-api-key: d8c4fbbd51cc66878c127e0687ced573252b49317f9e7dbc2d60f63bf1cfce4f
```

**Sample Response:**

```json
{
  "message": "API call successful",
  "success": true,
  "data": {
    "predicted_disease": "Migraine",
    "remedy": "Rest in a dark, quiet room.",
    "doctor": {
      "id": "680280e0863bec04d582b0f2",
      "name": "Dr. Gourab Das",
      "speciality": "ophthalmologist"
    }
  }
}
```

---

## 📦 Use Cases

- ✅ **Symptom-based diagnosis & doctor suggestion**
- 🔍 **Smart filtering in search systems**
- 📊 **Hospital-specific usage analytics**
- 📈 **Business insights based on API usage**
- 💼 **Integrate in existing hospital management software**
- 📲 **web application support**
- 🔁 **Multi-department queries like Cardiology, Pediatrics, etc.**

---

## 🚀 Future Improvements

- 📊 **Advanced dashboards for hospital owners**
- 📍 **Location-aware doctor recommendation**
- 📈 **Growth analytics and trends visualization**
- 📍 **Custome AI Model support with picture based anyalisis**
- 🔔 **API usage alerts & subscription notifications**
- 🔄 **Integration with EMRs and patient history**
- 💬 **AI chatbot for first-level support**

---

## 👨‍⚕️ Contributors

- Gourab Das
- Sagnik Sarkar
- Dipayan Sinha

---
> Built with ❤️ to bridge the gap between AI and Healthcare.

