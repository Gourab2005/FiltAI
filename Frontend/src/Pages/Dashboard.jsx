"use client"

import { useState, useEffect } from "react"
import { X, Plus, Minus, Crown } from "lucide-react"
import "animate.css"
import "aos/dist/aos.css"
import AOS from "aos"

const Dashboard = () => {
  // Base URL for API
  const API_BASE_URL = "http://localhost:3000/api"

  // State variables
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"))
  const [currentUser, setCurrentUser] = useState({
    username: localStorage.getItem("username") || "",
    email: localStorage.getItem("email") || "",
  })
  const [userProfile, setUserProfile] = useState(null)
  const [hospitals, setHospitals] = useState([])
  const [apiData, setApiData] = useState(null)
  const [activeTab, setActiveTab] = useState("hospitals")
  const [showAuthForms, setShowAuthForms] = useState(true)
  const [authMode, setAuthMode] = useState("login")
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState({ message: "", type: "", show: false })

  // Modal states
  const [showAddHospitalModal, setShowAddHospitalModal] = useState(false)
  const [showAddDoctorModal, setShowAddDoctorModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentMessage, setPaymentMessage] = useState("")

  // Form states
  const [loginForm, setLoginForm] = useState({ username: "", password: "" })
  const [signupForm, setSignupForm] = useState({ username: "", email: "", password: "" })
  const [hospitalForm, setHospitalForm] = useState({
    hospitalname: "",
    location: "",
    hospitalhead: "",
    contact: "",
  })
  const [doctorForm, setDoctorForm] = useState({
    hospitalId: "",
    doctorname: "",
    specialization: "",
    contact: "",
    email: "",
    availability: [{ day: "Monday", slots: [""] }],
  })
  const [selectedHospitalId, setSelectedHospitalId] = useState("")
  const [diagnosisHospitalId, setDiagnosisHospitalId] = useState("")

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])

  // Check if user is already logged in
  useEffect(() => {
    if (authToken) {
      loadUserProfile()
    }
  }, [authToken])

  // Load Cashfree SDK
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  // Show toast message
  const showToastMessage = (message, type) => {
    setToast({ message, type, show: true })
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }))
    }, 3000)
  }

  // Load user profile
  const loadUserProfile = async () => {
    setLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        headers: {
          Authorization: authToken || "",
        },
      })

      const data = await response.json()

      if (data.success) {
        setUserProfile(data.user)
        setHospitals(data.user.Hospitals || [])
        setApiData(data.user.Apidata && data.user.Apidata.length > 0 ? data.user.Apidata[0] : null)
        setShowAuthForms(false)
      } else {
        showToastMessage(data.message || "Failed to load profile", "error")
        if (response.status === 401) {
          setShowAuthForms(true)
        }
      }
    } catch (error) {
      showToastMessage("Error loading profile", "error")
      setShowAuthForms(true)
    } finally {
      setLoading(false)
    }
  }

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginForm),
      })

      const data = await response.json()

      if (data.success) {
        // Save token and user info to local storage
        localStorage.setItem("token", data.token)
        localStorage.setItem("username", data.username)
        localStorage.setItem("email", data.email)

        // Update auth state
        setAuthToken(data.token)
        setCurrentUser({
          username: data.username,
          email: data.email,
        })

        showToastMessage("Login successful!", "success")
      } else {
        showToastMessage(data.message || "Login failed", "error")
      }
    } catch (error) {
      showToastMessage("Error during login", "error")
    } finally {
      setLoading(false)
    }
  }

  // Handle signup
  const handleSignup = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupForm),
      })

      const data = await response.json()

      if (data.success) {
        showToastMessage("Signup successful! Please login.", "success")
        setAuthMode("login")
        setLoginForm({ ...loginForm, username: signupForm.username })
      } else {
        showToastMessage(data.message || "Signup failed", "error")
      }
    } catch (error) {
      showToastMessage("Error during signup", "error")
    } finally {
      setLoading(false)
    }
  }

  // Handle logout
  const handleLogout = () => {
    setAuthToken(null)
    setCurrentUser({ username: "", email: "" })
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("email")
    setShowAuthForms(true)
    showToastMessage("Logged out successfully!", "success")
  }

  // Handle add hospital
  const handleAddHospital = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/user/addHospital`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken || "",
        },
        body: JSON.stringify(hospitalForm),
      })

      const data = await response.json()

      if (data.message && data.message.includes("successfully")) {
        showToastMessage("Hospital added successfully!", "success")
        setShowAddHospitalModal(false)
        setHospitalForm({
          hospitalname: "",
          location: "",
          hospitalhead: "",
          contact: "",
        })

        // Refresh user profile to get updated hospital list
        await loadUserProfile()
      } else {
        showToastMessage(data.message || "Failed to add hospital", "error")
      }
    } catch (error) {
      showToastMessage("Error adding hospital", "error")
    } finally {
      setLoading(false)
    }
  }

  // Add availability slot
  const addAvailabilitySlot = () => {
    setDoctorForm((prev) => ({
      ...prev,
      availability: [...prev.availability, { day: "Monday", slots: [""] }],
    }))
  }

  // Remove availability slot
  const removeAvailabilitySlot = (index) => {
    if (doctorForm.availability.length > 1) {
      setDoctorForm((prev) => ({
        ...prev,
        availability: prev.availability.filter((_, i) => i !== index),
      }))
    }
  }

  // Update availability day
  const updateAvailabilityDay = (index, day) => {
    setDoctorForm((prev) => {
      const newAvailability = [...prev.availability]
      newAvailability[index] = { ...newAvailability[index], day }
      return { ...prev, availability: newAvailability }
    })
  }

  // Update availability slots
  const updateAvailabilitySlots = (index, slotsText) => {
    setDoctorForm((prev) => {
      const newAvailability = [...prev.availability]
      newAvailability[index] = {
        ...newAvailability[index],
        slots: slotsText.split(",").map((slot) => slot.trim()),
      }
      return { ...prev, availability: newAvailability }
    })
  }

  // Handle add doctor
  const handleAddDoctor = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/user/adddoctor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken || "",
        },
        body: JSON.stringify(doctorForm),
      })

      const data = await response.json()

      if (data.message && data.message.includes("successfully")) {
        showToastMessage("Doctor added successfully!", "success")
        setShowAddDoctorModal(false)
        setDoctorForm({
          hospitalId: "",
          doctorname: "",
          specialization: "",
          contact: "",
          email: "",
          availability: [{ day: "Monday", slots: [""] }],
        })

        // Refresh user profile to get updated doctor list
        await loadUserProfile()
      } else {
        showToastMessage(data.message || "Failed to add doctor", "error")
      }
    } catch (error) {
      showToastMessage("Error adding doctor", "error")
    } finally {
      setLoading(false)
    }
  }

  // Generate API key
  const generateApiKey = async () => {
    setLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/service/generate-api`, {
        method: "POST",
        headers: {
          Authorization: authToken || "",
        },
      })

      const data = await response.json()

      if (data.success) {
        showToastMessage("API key generated successfully!", "success")

        // Refresh user profile to get updated API data
        await loadUserProfile()
      } else {
        showToastMessage(data.message || "Failed to generate API key", "error")
      }
    } catch (error) {
      showToastMessage("Error generating API key", "error")
    } finally {
      setLoading(false)
    }
  }

  // Subscribe to premium
  const subscribe = async () => {
    setShowPaymentModal(true)
    setPaymentMessage("Processing your request...")

    try {
      const response = await fetch(`${API_BASE_URL}/service/subscribe`, {
        method: "POST",
        headers: {
          Authorization: authToken || "",
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (data.success && data.paymentSessionId) {
        setPaymentMessage("Session created. Opening Cashfree checkout...")

        // Initialize Cashfree checkout
        if (window.Cashfree) {
          const cashfree = window.Cashfree({ mode: "sandbox" })
          cashfree.checkout({
            paymentSessionId: data.paymentSessionId,
            redirect: false,
            onSuccess: async (paymentData) => {
              console.log("Payment success:", paymentData)
              setPaymentMessage("Payment successful! Verifying...")

              try {
                // Verify payment with server
                const verifyResponse = await fetch(`${API_BASE_URL}/service/payment-success`, {
                  method: "POST",
                  headers: {
                    Authorization: authToken,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    order_id: paymentData.order.order_id,
                    payment_id: paymentData.transaction.paymentId || paymentData.transaction.txnId,
                    reference_id: paymentData.transaction.referenceId || "",
                    amount: paymentData.order.amount,
                    status: "SUCCESS",
                  }),
                })

                const verifyData = await verifyResponse.json()

                if (verifyData.success) {
                  setPaymentMessage(verifyData.message || "Payment completed successfully!")
                  showToastMessage("Subscription upgraded successfully!", "success")

                  // Refresh user profile to get updated subscription data
                  setTimeout(async () => {
                    await loadUserProfile()
                    setShowPaymentModal(false)
                  }, 2000)
                } else {
                  setPaymentMessage(verifyData.message || "Error verifying payment status.")
                  showToastMessage("Payment verification failed", "error")
                }
              } catch (error) {
                setPaymentMessage("Error during payment verification. Please contact support.")
                showToastMessage("Error during verification", "error")
              }
            },
            onFailure: (failData) => {
              console.error("Payment failed:", failData)
              setPaymentMessage(failData.message || "Payment failed. Please try again.")
              showToastMessage("Payment failed", "error")
            },
            onClose: () => {
              setPaymentMessage("Payment window closed. You can try again when ready.")
              setTimeout(() => {
                setShowPaymentModal(false)
              }, 2000)
            },
          })
        } else {
          setPaymentMessage("Cashfree SDK not loaded. Please refresh the page and try again.")
          setTimeout(() => {
            setShowPaymentModal(false)
          }, 3000)
        }
      } else if (data.cashfree_url) {
        // For backward compatibility with the old API response format
        setPaymentMessage("Redirecting to Cashfree...")
        window.location.href = data.cashfree_url
      } else {
        setPaymentMessage(data.message || "Error creating payment session.")
        showToastMessage(data.message || "Failed to initiate subscription", "error")
        setTimeout(() => {
          setShowPaymentModal(false)
        }, 2000)
      }
    } catch (error) {
      setPaymentMessage("Error connecting to payment service. Please try again later.")
      showToastMessage("Error during subscription", "error")
      setTimeout(() => {
        setShowPaymentModal(false)
      }, 2000)
    }
  }

  // Calculate API usage percentage
  const calculateApiUsagePercentage = () => {
    if (!apiData || !apiData.limit || apiData.limit === 0) return 0
    return Math.min(100, Math.round((apiData.apicallCount / apiData.limit) * 100))
  }

  // Render hospitals list
  const renderHospitalsList = () => {
    if (hospitals.length === 0) {
      return <p className="text-gray-400">No hospitals found. Add your first hospital to get started!</p>
    }

    return hospitals.map((hospital, index) => (
      <div
        key={hospital._id || index}
        className="bg-gray-800 rounded-lg p-4 mb-4 shadow-md border border-gray-700"
        data-aos="fade-up"
      >
        <h3 className="text-xl font-semibold text-blue-400">{hospital.hospitalname}</h3>
        <p className="mt-2">
          <span className="font-medium text-gray-300">Location:</span>{" "}
          <span className="text-gray-400">{hospital.location}</span>
        </p>
        <p>
          <span className="font-medium text-gray-300">Head:</span>{" "}
          <span className="text-gray-400">{hospital.hospitalhead}</span>
        </p>
        <p>
          <span className="font-medium text-gray-300">Contact:</span>{" "}
          <span className="text-gray-400">{hospital.contact}</span>
        </p>
        <p>
          <span className="font-medium text-gray-300">Doctors:</span>{" "}
          <span className="text-gray-400">{hospital.Doctors ? hospital.Doctors.length : 0}</span>
        </p>

        {hospital.Doctors && hospital.Doctors.length > 0 && (
          <div className="mt-4">
            <h4 className="font-medium text-blue-400 mb-2">Doctors:</h4>
            {hospital.Doctors.map((doctor, idx) => (
              <div key={doctor._id || idx} className="bg-gray-700 p-3 rounded-md mb-2">
                <p className="font-medium text-gray-200">
                  {doctor.doctorname} - {doctor.specialization}
                </p>
                <p className="text-sm text-gray-400">Contact: {doctor.contact}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    ))
  }

  // Render doctors list
  const renderDoctorsList = () => {
    if (!selectedHospitalId) {
      return <p className="text-gray-400">Please select a hospital to view doctors.</p>
    }

    const hospital = hospitals.find((h) => h._id === selectedHospitalId)

    if (!hospital || !hospital.Doctors || hospital.Doctors.length === 0) {
      return <p className="text-gray-400">No doctors found for this hospital. Add a doctor to get started!</p>
    }

    return hospital.Doctors.map((doctor, index) => (
      <div
        key={doctor._id || index}
        className="bg-gray-800 rounded-lg p-4 mb-4 shadow-md border border-gray-700"
        data-aos="fade-up"
      >
        <h3 className="text-xl font-semibold text-blue-400">{doctor.doctorname}</h3>
        <p className="mt-2">
          <span className="font-medium text-gray-300">Specialization:</span>{" "}
          <span className="text-gray-400">{doctor.specialization}</span>
        </p>
        <p>
          <span className="font-medium text-gray-300">Contact:</span>{" "}
          <span className="text-gray-400">{doctor.contact}</span>
        </p>
        <p>
          <span className="font-medium text-gray-300">Email:</span>{" "}
          <span className="text-gray-400">{doctor.email}</span>
        </p>

        <div className="mt-3">
          <p className="font-medium text-gray-300">Availability:</p>
          <ul className="list-disc pl-5 mt-1 text-gray-400">
            {doctor.availability.map((avail, idx) => (
              <li key={idx}>
                {avail.day}: {avail.slots.join(", ")}
              </li>
            ))}
          </ul>
        </div>
      </div>
    ))
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="py-6 border-b border-gray-700 flex justify-between items-center">
          <div className="flex items-center text-2xl font-bold text-blue-500">
            <span>🏥 FitAI</span>
          </div>
          {!showAuthForms && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Logout
            </button>
          )}
        </header>

        {/* Auth Container */}
        {showAuthForms ? (
          <div className="max-w-md mx-auto mt-10 bg-gray-800 p-8 rounded-lg shadow-md" data-aos="fade-up">
            <div className="flex mb-6 border-b border-gray-700">
              <button
                className={`flex-1 pb-2 ${authMode === "login" ? "border-b-2 border-blue-500 text-blue-500 font-medium" : "text-gray-400"}`}
                onClick={() => setAuthMode("login")}
              >
                Login
              </button>
              <button
                className={`flex-1 pb-2 ${authMode === "signup" ? "border-b-2 border-blue-500 text-blue-500 font-medium" : "text-gray-400"}`}
                onClick={() => setAuthMode("signup")}
              >
                Sign Up
              </button>
            </div>

            {/* Login Form */}
            {authMode === "login" && (
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label htmlFor="loginUsername" className="block mb-1 font-medium">
                    Username
                  </label>
                  <input
                    type="text"
                    id="loginUsername"
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="loginPassword" className="block mb-1 font-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    id="loginPassword"
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Login
                </button>
              </form>
            )}

            {/* Signup Form */}
            {authMode === "signup" && (
              <form onSubmit={handleSignup}>
                <div className="mb-4">
                  <label htmlFor="signupUsername" className="block mb-1 font-medium">
                    Username
                  </label>
                  <input
                    type="text"
                    id="signupUsername"
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    value={signupForm.username}
                    onChange={(e) => setSignupForm({ ...signupForm, username: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="signupEmail" className="block mb-1 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="signupEmail"
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    value={signupForm.email}
                    onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="signupPassword" className="block mb-1 font-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    id="signupPassword"
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    value={signupForm.password}
                    onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </button>
              </form>
            )}
          </div>
        ) : (
          /* Dashboard */
          <div className="py-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">
                Welcome, <span className="text-blue-500">{currentUser.username}</span>!
              </h2>
              <div className="flex items-center">
                {apiData?.subscriptionType === "Paid" && (
                  <div className="mr-3 flex items-center">
                    <Crown className="h-5 w-5 text-yellow-500 mr-1" />
                    <span className="text-yellow-400 font-medium">Premium</span>
                  </div>
                )}
                <span className="text-gray-400">{currentUser.email}</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-700 mb-6">
              <div className="flex">
                <button
                  className={`px-4 py-2 ${activeTab === "hospitals" ? "border-b-2 border-blue-500 text-blue-500 font-medium" : "text-gray-400"}`}
                  onClick={() => setActiveTab("hospitals")}
                >
                  Hospitals
                </button>
                <button
                  className={`px-4 py-2 ${activeTab === "doctors" ? "border-b-2 border-blue-500 text-blue-500 font-medium" : "text-gray-400"}`}
                  onClick={() => setActiveTab("doctors")}
                >
                  Doctors
                </button>
                <button
                  className={`px-4 py-2 ${activeTab === "apiSettings" ? "border-b-2 border-blue-500 text-blue-500 font-medium" : "text-gray-400"}`}
                  onClick={() => setActiveTab("apiSettings")}
                >
                  API Settings
                </button>
              </div>
            </div>

            {/* Hospitals Tab */}
            {activeTab === "hospitals" && (
              <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-200">My Hospitals</h3>
                  <button
                    onClick={() => setShowAddHospitalModal(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Add Hospital
                  </button>
                </div>
                <div>{renderHospitalsList()}</div>
              </div>
            )}

            {/* Doctors Tab */}
            {activeTab === "doctors" && (
              <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-200">Doctors</h3>
                  <button
                    onClick={() => setShowAddDoctorModal(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Add Doctor
                  </button>
                </div>
                <div className="mb-6">
                  <select
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    value={selectedHospitalId}
                    onChange={(e) => setSelectedHospitalId(e.target.value)}
                  >
                    <option value="">Select Hospital</option>
                    {hospitals.map((hospital) => (
                      <option key={hospital._id} value={hospital._id}>
                        {hospital.hospitalname}
                      </option>
                    ))}
                  </select>
                </div>
                <div>{renderDoctorsList()}</div>
              </div>
            )}

            {/* API Settings Tab */}
            {activeTab === "apiSettings" && (
              <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                <div className="mb-6 pb-4 border-b border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-200">API Management</h3>
                </div>
                <div>
                  <div
                    className={`p-5 rounded-md mb-6 ${
                      apiData?.subscriptionType === "Paid"
                        ? "bg-yellow-900 bg-opacity-20 border border-yellow-700"
                        : "bg-blue-900 bg-opacity-20 border border-blue-700"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-medium text-gray-300">
                        Status:
                        <span
                          className={`ml-2 px-2 py-0.5 text-sm rounded-full ${
                            apiData?.activationstatus
                              ? "bg-green-900 bg-opacity-50 text-green-400"
                              : "bg-red-900 bg-opacity-50 text-red-400"
                          }`}
                        >
                          {apiData?.activationstatus ? "Active" : "Inactive"}
                        </span>
                      </p>
                      {apiData?.subscriptionType === "Paid" && (
                        <div className="flex items-center bg-yellow-600 bg-opacity-70 text-yellow-200 px-3 py-1 rounded-full">
                          <Crown className="h-4 w-4 mr-1" />
                          <span className="font-medium">Subscribed</span>
                        </div>
                      )}
                    </div>

                    <p className="mb-2">
                      <span className="font-medium text-gray-300">API Key:</span>
                      <span className="ml-2 font-mono bg-gray-900 px-2 py-1 rounded text-sm text-gray-300">
                        {apiData?.apiKey || "Not Generated"}
                      </span>
                    </p>

                    <p className="mb-2">
                      <span className="font-medium text-gray-300">Subscription:</span>
                      <span className="ml-2 text-gray-400">{apiData?.subscriptionType || "Free"}</span>
                    </p>

                    <div className="mb-2">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-gray-300">API Calls:</span>
                        <span className="text-gray-400">
                          {apiData?.apicallCount || 0}/{apiData?.limit || 0}
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${apiData?.subscriptionType === "Paid" ? "bg-yellow-500" : "bg-blue-600"}`}
                          style={{ width: `${calculateApiUsagePercentage()}%` }}
                        ></div>
                      </div>
                    </div>

                    <p>
                      <span className="font-medium text-gray-300">Valid Until:</span>
                      <span className="ml-2 text-gray-400">
                        {apiData?.subscriptionEndDate
                          ? new Date(apiData.subscriptionEndDate).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </p>

                    <div className="mt-4">
                      <p className="font-medium text-gray-300 mb-2">API Endpoints:</p>
                      <div className="bg-gray-900 text-gray-300 p-3 rounded-md font-mono text-sm overflow-x-auto">
                        <p>http://localhost:3000/api/service/AgentResponse?hospitalId=68026da649ad1088d5a30603</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    {(!apiData || !apiData.apiKey) && (
                      <button
                        onClick={generateApiKey}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Generate API Key
                      </button>
                    )}

                    {(!apiData || apiData.subscriptionType !== "Paid") && (
                      <button
                        onClick={subscribe}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Upgrade Subscription
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Add Hospital Modal */}
        {showAddHospitalModal && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-200">Add New Hospital</h3>
                <button onClick={() => setShowAddHospitalModal(false)} className="text-gray-400 hover:text-gray-200">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleAddHospital}>
                <div className="mb-4">
                  <label htmlFor="hospitalName" className="block mb-1 font-medium text-gray-300">
                    Hospital Name
                  </label>
                  <input
                    type="text"
                    id="hospitalName"
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    value={hospitalForm.hospitalname}
                    onChange={(e) => setHospitalForm({ ...hospitalForm, hospitalname: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="hospitalLocation" className="block mb-1 font-medium text-gray-300">
                    Location
                  </label>
                  <input
                    type="text"
                    id="hospitalLocation"
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    value={hospitalForm.location}
                    onChange={(e) => setHospitalForm({ ...hospitalForm, location: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="hospitalHead" className="block mb-1 font-medium text-gray-300">
                    Hospital Head
                  </label>
                  <input
                    type="text"
                    id="hospitalHead"
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    value={hospitalForm.hospitalhead}
                    onChange={(e) => setHospitalForm({ ...hospitalForm, hospitalhead: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="hospitalContact" className="block mb-1 font-medium text-gray-300">
                    Contact
                  </label>
                  <input
                    type="text"
                    id="hospitalContact"
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    value={hospitalForm.contact}
                    onChange={(e) => setHospitalForm({ ...hospitalForm, contact: e.target.value })}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add Hospital
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Add Doctor Modal */}
        {showAddDoctorModal && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-200">Add New Doctor</h3>
                <button onClick={() => setShowAddDoctorModal(false)} className="text-gray-400 hover:text-gray-200">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleAddDoctor}>
                <div className="mb-4">
                  <label htmlFor="doctorHospital" className="block mb-1 font-medium text-gray-300">
                    Hospital
                  </label>
                  <select
                    id="doctorHospital"
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    value={doctorForm.hospitalId}
                    onChange={(e) => setDoctorForm({ ...doctorForm, hospitalId: e.target.value })}
                    required
                  >
                    <option value="">Select Hospital</option>
                    {hospitals.map((hospital) => (
                      <option key={hospital._id} value={hospital._id}>
                        {hospital.hospitalname}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="doctorName" className="block mb-1 font-medium text-gray-300">
                    Doctor Name
                  </label>
                  <input
                    type="text"
                    id="doctorName"
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    value={doctorForm.doctorname}
                    onChange={(e) => setDoctorForm({ ...doctorForm, doctorname: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="doctorSpecialization" className="block mb-1 font-medium text-gray-300">
                    Specialization
                  </label>
                  <input
                    type="text"
                    id="doctorSpecialization"
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    value={doctorForm.specialization}
                    onChange={(e) => setDoctorForm({ ...doctorForm, specialization: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="doctorContact" className="block mb-1 font-medium text-gray-300">
                    Contact
                  </label>
                  <input
                    type="text"
                    id="doctorContact"
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    value={doctorForm.contact}
                    onChange={(e) => setDoctorForm({ ...doctorForm, contact: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="doctorEmail" className="block mb-1 font-medium text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    id="doctorEmail"
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    value={doctorForm.email}
                    onChange={(e) => setDoctorForm({ ...doctorForm, email: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-1 font-medium text-gray-300">Availability</label>
                  {doctorForm.availability.map((avail, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <select
                        className="flex-1 p-2 bg-gray-700 border border-gray-600 rounded-md text-white mr-2"
                        value={avail.day}
                        onChange={(e) => updateAvailabilityDay(index, e.target.value)}
                      >
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                      </select>
                      <input
                        type="text"
                        className="flex-1 p-2 bg-gray-700 border border-gray-600 rounded-md text-white mr-2"
                        placeholder="e.g. 9-12, 2-4"
                        value={avail.slots.join(", ")}
                        onChange={(e) => updateAvailabilitySlots(index, e.target.value)}
                        required
                      />
                      {index === 0 ? (
                        <button
                          type="button"
                          onClick={addAvailabilitySlot}
                          className="p-2 bg-blue-900 text-blue-400 rounded-md hover:bg-blue-800"
                        >
                          <Plus className="h-5 w-5" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => removeAvailabilitySlot(index)}
                          className="p-2 bg-red-900 text-red-400 rounded-md hover:bg-red-800"
                        >
                          <Minus className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add Doctor
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Payment Modal */}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-200">Payment Processing</h3>
                <button onClick={() => setShowPaymentModal(false)} className="text-gray-400 hover:text-gray-200">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="text-center py-6 text-gray-300">{paymentMessage}</div>
            </div>
          </div>
        )}

        {/* Toast Notification */}
        {toast.show && (
          <div
            className={`fixed bottom-4 right-4 px-4 py-3 rounded-md shadow-lg animate__animated animate__fadeIn ${
              toast.type === "success" ? "bg-green-600" : "bg-red-600"
            } text-white`}
          >
            {toast.message}
          </div>
        )}

        {/* Loading Indicator */}
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-4 rounded-md shadow-md text-white">
              <p>Loading...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
