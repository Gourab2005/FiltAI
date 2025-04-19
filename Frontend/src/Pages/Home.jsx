import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import "animate.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("healthcare");

  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const element = document.getElementById("scroll-element");
    if (element && scrollPosition > element.offsetTop) {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
    window.addEventListener("scroll", handleScroll);

    const cursor = document.createElement("div");
    cursor.classList.add("custom-cursor");
    document.body.appendChild(cursor);

    const moveCursor = (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    };

    const interactiveElements = document.querySelectorAll(
      "button, a, .cursor-pointer"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () =>
        cursor.classList.add("cursor-hover")
      );
      el.addEventListener("mouseleave", () =>
        cursor.classList.remove("cursor-hover")
      );
    });

    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", moveCursor);
      document.body.removeChild(cursor);
    };
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="font-sans">
      <Navbar />
      <div className="bg-gray-900 text-white min-h-screen relative ">
        {/* Hero Section */}
        <section
          id="Home"
          className=" h-screen flex flex-col justify-center items-center text-center pt-[50px] bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 relative overflow-hidden mb-[80px]"
        >
          <div className="absolute inset-0 bg-[url('/api/placeholder/1200/800')] opacity-10 bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900 to-gray-900"></div>

          <div className="relative z-10 px-6 max-w-4xl mx-auto">
            <div className="mb-6 flex justify-center">
              <span className="bg-blue-500 bg-opacity-20 text-blue-300 px-4 py-1 rounded-full text-sm font-medium">
                Powering Healthcare Matching with AI
              </span>
            </div>

            <h1
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent"
              data-aos="fade-down"
            >
              FiltAI
            </h1>
            <p className="text-2xl font-semibold text-blue-300 mt-2 mb-6" data-aos="fade-up" data-aos-delay="100">
              Smart Symptom-to-Doctor Matching API
            </p>
            <p className="mt-6 text-lg mb-10 text-gray-300 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
              Deploy intelligent patient-doctor matching with our powerful API.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <button className="bg-gradient-to-r from-blue-500 to-teal-400 text-white px-8 py-3 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition duration-300 transform hover:-translate-y-1">
                Try API Free
              </button>
              <button className="bg-gray-800 bg-opacity-60 backdrop-blur-sm text-white border border-gray-700 px-8 py-3 rounded-lg hover:border-blue-400 transition duration-300">
                View Documentation
              </button>
            </div>

            <div className="mt-12 flex justify-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-300">99.2%</div>
                <div className="text-sm text-gray-400">Match Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-300">200+</div>
                <div className="text-sm text-gray-400">Healthcare Providers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-300">10M+</div>
                <div className="text-sm text-gray-400">Monthly Predictions</div>
              </div>
            </div>
          </div>
        </section>

        
        {/* Use Cases */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-3xl font-semibold text-center mb-4"
              data-aos="fade-up"
            >
              <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                Integration Use Cases
              </span>
            </h2>
            <p
              className="text-gray-400 text-center mb-12 max-w-2xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              FiltAI's versatile API integrates seamlessly with healthcare
              systems to provide smart matching capabilities
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button
                onClick={() => handleTabChange("healthcare")}
                className={`px-5 py-2 rounded-full text-sm transition ${
                  activeTab === "healthcare"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                Hospital Systems
              </button>
              <button
                onClick={() => handleTabChange("telemedicine")}
                className={`px-5 py-2 rounded-full text-sm transition ${
                  activeTab === "telemedicine"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                Telemedicine
              </button>
              <button
                onClick={() => handleTabChange("clinics")}
                className={`px-5 py-2 rounded-full text-sm transition ${
                  activeTab === "clinics"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                Private Clinics
              </button>
              <button
                onClick={() => handleTabChange("apps")}
                className={`px-5 py-2 rounded-full text-sm transition ${
                  activeTab === "apps"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                Health Apps
              </button>
            </div>

            <div className="bg-gray-800 bg-opacity-50 rounded-2xl p-8 shadow-xl border border-gray-700">
              {activeTab === "healthcare" && (
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div data-aos="fade-right">
                    <h3 className="text-2xl font-semibold text-blue-300 mb-4">
                      Hospital Integration
                    </h3>
                    <p className="text-gray-300 mb-6">
                      Integrate FiltAI directly into your hospital management
                      system to automatically match patients with the most
                      qualified specialists based on symptoms and medical
                      history.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="bg-blue-500 p-1 rounded-full mr-3 mt-1">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <span>Reduce patient wait times by 40%</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-blue-500 p-1 rounded-full mr-3 mt-1">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <span>Optimize specialist allocation</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-blue-500 p-1 rounded-full mr-3 mt-1">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <span>HIPAA compliant data processing</span>
                      </li>
                    </ul>
                  </div>
                  <div
                    className="rounded-xl overflow-hidden"
                    data-aos="fade-left"
                  >
                    <img
                      src="https://imgs.search.brave.com/7a_N-lIK9K636qcvZblFSlRu5g3IaKGxxlBfQN2acok/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzk4LzAwLzEy/LzM2MF9GXzI5ODAw/MTIzOF9kSXd6bVdt/ZVI0blE4SHhrWnZ1/blh2cUpuSGdqQXdW/ZS5qcGc"
                      alt="Hospital Integration"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              )}

              {activeTab === "telemedicine" && (
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div data-aos="fade-right">
                    <h3 className="text-2xl font-semibold text-blue-300 mb-4">
                      Telemedicine Platform
                    </h3>
                    <p className="text-gray-300 mb-6">
                      Power your virtual care platforms with intelligent routing
                      to connect patients with the right specialists based on
                      reported symptoms.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="bg-blue-500 p-1 rounded-full mr-3 mt-1">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <span>Smart queue management</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-blue-500 p-1 rounded-full mr-3 mt-1">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <span>Improved first-time diagnosis accuracy</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-blue-500 p-1 rounded-full mr-3 mt-1">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <span>Intelligent follow-up scheduling</span>
                      </li>
                    </ul>
                  </div>
                  <div
                    className="rounded-xl overflow-hidden"
                    data-aos="fade-left"
                  >
                    <img
                      src="https://imgs.search.brave.com/SemSktorD1GP6VkXYAqcfp8ZiFElAfcRol4olHEWCfk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA5LzY1LzYxLzEy/LzM2MF9GXzk2NTYx/MTI5NV8wb2xpcjMy/M1VrRUtwbFg4QUdD/WjZBY3VmRVFZSHU4/cC5qcGc"
                      alt="Telemedicine Platform"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              )}

              {activeTab === "clinics" && (
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div data-aos="fade-right">
                    <h3 className="text-2xl font-semibold text-blue-300 mb-4">
                      Private Clinic Solutions
                    </h3>
                    <p className="text-gray-300 mb-6">
                      Optimize your clinic's appointment system with our
                      AI-powered matching algorithm that ensures patients see
                      the right specialist on their first visit.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="bg-blue-500 p-1 rounded-full mr-3 mt-1">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <span>Customizable matching criteria</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-blue-500 p-1 rounded-full mr-3 mt-1">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <span>Reduced unnecessary referrals</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-blue-500 p-1 rounded-full mr-3 mt-1">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <span>Patient satisfaction improvement</span>
                      </li>
                    </ul>
                  </div>
                  <div
                    className="rounded-xl overflow-hidden"
                    data-aos="fade-left"
                  >
                    <img
                      src="https://images.pexels.com/photos/8442105/pexels-photo-8442105.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="Private Clinic"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              )}

              {activeTab === "apps" && (
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div data-aos="fade-right">
                    <h3 className="text-2xl font-semibold text-blue-300 mb-4">
                      Health App Integration
                    </h3>
                    <p className="text-gray-300 mb-6">
                      Enhance your health application with smart symptom
                      analysis and doctor recommendation features through our
                      simple API.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="bg-blue-500 p-1 rounded-full mr-3 mt-1">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <span>Quick API integration</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-blue-500 p-1 rounded-full mr-3 mt-1">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <span>White-label capabilities</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-blue-500 p-1 rounded-full mr-3 mt-1">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <span>Multi-language support</span>
                      </li>
                    </ul>
                  </div>
                  <div
                    className="rounded-xl overflow-hidden"
                    data-aos="fade-left"
                  >
                    <img
                      src="https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="Health App"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section
          className="py-20 px-6 bg-gradient-to-b from-gray-900 to-gray-800"
          id="scroll-element"
        >
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-3xl font-semibold text-center mb-4"
              data-aos="fade-up"
            >
              <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                How FiltAI Works
              </span>
            </h2>
            <p
              className="text-gray-400 text-center mb-16 max-w-2xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Our intelligent API processes symptom data and matches patients
              with the most qualified healthcare providers
            </p>

            <div className="grid md:grid-cols-3 gap-x-6 gap-y-16">
              <div
                className="text-center relative"
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/30">
                  1
                </div>
                <div className="pt-8 px-6 pb-8 bg-gray-800 rounded-xl border border-gray-700 h-full">
                  <div className="h-12 mb-4 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-300">
                    Data Collection
                  </h3>
                  <p className="text-gray-300">
                    Collect patient symptoms through your form or interface
                    using our structured API format.
                  </p>
                </div>
              </div>

              <div
                className="text-center relative"
                data-aos="zoom-in"
                data-aos-delay="400"
              >
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/30">
                  2
                </div>
                <div className="pt-8 px-6 pb-8 bg-gray-800 rounded-xl border border-gray-700 h-full">
                  <div className="h-12 mb-4 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-300">
                    AI Processing
                  </h3>
                  <p className="text-gray-300">
                    Our advanced AI analyzes symptoms, medical history, and
                    determines potential conditions.
                  </p>
                </div>
              </div>

              <div
                className="text-center relative"
                data-aos="zoom-in"
                data-aos-delay="600"
              >
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/30">
                  3
                </div>
                <div className="pt-8 px-6 pb-8 bg-gray-800 rounded-xl border border-gray-700 h-full">
                  <div className="h-12 mb-4 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-300">
                    Match Results
                  </h3>
                  <p className="text-gray-300">
                    Receive ranked specialist recommendations from your
                    healthcare database optimized for expertise match.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* API Features */}
        <section id="Features" className="py-20 px-6 bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-3xl font-semibold text-center mb-4"
              data-aos="fade-up"
            >
              <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                API Features
              </span>
            </h2>
            <p
              className="text-gray-400 text-center mb-16 max-w-2xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              A powerful engine designed for healthcare integration
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-blue-400 transition duration-300 transform hover:-translate-y-1"
                data-aos="flip-left"
              >
                <div className="bg-blue-500 bg-opacity-20 rounded-full h-14 w-14 flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-blue-300">
                  AI-based Disease Prediction
                </h3>
                <p className="text-gray-400">
                  Advanced machine learning models analyze symptoms against a
                  vast medical database to predict potential conditions.
                </p>
              </div>

              <div
                className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-blue-400 transition duration-300 transform hover:-translate-y-1"
                data-aos="flip-left"
                data-aos-delay="100"
              >
                <div className="bg-blue-500 bg-opacity-20 rounded-full h-14 w-14 flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-blue-300">
                  Specialist Matching
                </h3>
                <p className="text-gray-400">
                  Intelligently match patients with the most qualified
                  healthcare providers based on expertise and specialization.
                </p>
              </div>

              <div
                className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-blue-400 transition duration-300 transform hover:-translate-y-1"
                data-aos="flip-left"
                data-aos-delay="200"
              >
                <div className="bg-blue-500 bg-opacity-20 rounded-full h-14 w-14 flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-blue-300">
                  HIPAA Compliant
                </h3>
                <p className="text-gray-400">
                  Enterprise-grade security with full HIPAA compliance for all
                  data processing and storage operations.
                </p>
              </div>

              <div
                className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-blue-400 transition duration-300 transform hover:-translate-y-1"
                data-aos="flip-left"
                data-aos-delay="300"
              >
                <div className="bg-blue-500 bg-opacity-20 rounded-full h-14 w-14 flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-blue-300">
                  Real-time Processing
                </h3>
                <p className="text-gray-400">
                  Lightning-fast API responses with under 200ms average
                  processing time for immediate patient routing.
                </p>
              </div>

              <div
                className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-blue-400 transition duration-300 transform hover:-translate-y-1"
                data-aos="flip-left"
                data-aos-delay="400"
              >
                <div className="bg-blue-500 bg-opacity-20 rounded-full h-14 w-14 flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-blue-300">
                  Comprehensive Database
                </h3>
                <p className="text-gray-400">
                  Access to a vast medical knowledge base with over 10,000
                  symptoms and 5,000 conditions for accurate matching.
                </p>
              </div>

              <div
                className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-blue-400 transition duration-300 transform hover:-translate-y-1"
                data-aos="flip-left"
                data-aos-delay="500"
              >
                <div className="bg-blue-500 bg-opacity-20 rounded-full h-14 w-14 flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-blue-300">
                  Flexible Integration
                </h3>
                <p className="text-gray-400">
                  Easy integration with RESTful API, webhooks, and SDKs for all
                  major programming languages.
                </p>
              </div>

              <div
                className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-blue-400 transition duration-300 transform hover:-translate-y-1"
                data-aos="flip-left"
                data-aos-delay="600"
              >
                <div className="bg-blue-500 bg-opacity-20 rounded-full h-14 w-14 flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-blue-300">
                  Detailed Analytics
                </h3>
                <p className="text-gray-400">
                  Comprehensive reporting dashboard with insights on matching
                  accuracy and patient outcomes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section
          id="Pricing"
          className="py-20 px-6 bg-gradient-to-b from-gray-800 to-gray-900"
        >
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-3xl font-semibold text-center mb-4"
              data-aos="fade-up"
            >
              <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                Simple, Transparent Pricing
              </span>
            </h2>
            <p
              className="text-gray-400 text-center mb-16 max-w-2xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Choose the plan that fits your healthcare organization's needs
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div
                className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 transition-all duration-300 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="p-8">
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    Basic
                  </h3>
                  <p className="text-gray-400 mb-6">
                    For small clinics and healthcare startups
                  </p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">Free</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <div className="bg-blue-500 p-1 rounded-full mr-3 mt-1">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <span className="text-gray-300">
                        Up to 50 API calls/month
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-500 p-1 rounded-full mr-3 mt-1">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <span className="text-gray-300">Symptom analysis</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-500 p-1 rounded-full mr-3 mt-1">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <span className="text-gray-300">
                        Add only one hospital
                      </span>
                    </li>
                  </ul>
                  <Link to={"/dashboard"}>
                    <button className="hover:shadow-[0_0_14px_2px] hover:shadow-white w-full py-3 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition duration-300">
                      Sign Up
                    </button>
                  </Link>
                </div>
              </div>

              <div
                className="bg-gradient-to-b from-blue-900 to-gray-800 rounded-2xl overflow-hidden border border-blue-500 transform scale-105 shadow-xl shadow-blue-500/20 relative z-10"
                data-aos="fade-up"
              >
                <div className="absolute top-0 left-0 right-0 bg-blue-500 text-white text-center py-1 text-sm font-medium">
                  Most Popular
                </div>
                <div className="p-8 pt-10">
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    Premium
                  </h3>
                  <p className="text-gray-300 mb-6">
                    For mid-sized healthcare providers
                  </p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">
                      $10.00
                    </span>
                    <span className="text-gray-300">/month</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <div className="bg-blue-500 p-1 rounded-full mr-3 mt-1">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <span className="text-gray-200">
                        Up to 1500 API calls/month
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-500 p-1 rounded-full mr-3 mt-1">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <span className="text-gray-200">
                        Multi-lingual API response
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-500 p-1 rounded-full mr-3 mt-1">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <span className="text-gray-200">
                        Comprehensive analytics
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-500 p-1 rounded-full mr-3 mt-1">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <span className="text-gray-200">
                        Appointment booking system
                      </span>
                    </li>
                  </ul>
                  <Link to={"/dashboard"}>
                    <button className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-300 shadow-lg shadow-blue-500/30 hover:shadow-[0_0_14px_2px] hover:shadow-blue-300">
                      Sign Up
                    </button>
                  </Link>
                </div>
              </div>

              <div
                className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 transition-all duration-300 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="p-8">
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    Enterprise
                  </h3>
                  <p className="text-gray-400 mb-6">
                    For hospitals and large healthcare networks
                  </p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">
                      Custom
                    </span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <div className="bg-blue-500 p-1 rounded-full mr-3 mt-1">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <span className="text-gray-300">Unlimited API calls</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-500 p-1 rounded-full mr-3 mt-1">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <span className="text-gray-300">
                        Full symptom analysis suite
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-500 p-1 rounded-full mr-3 mt-1">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <span className="text-gray-300">
                        24/7 dedicated support
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-500 p-1 rounded-full mr-3 mt-1">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <span className="text-gray-300">
                        Custom AI model training
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-500 p-1 rounded-full mr-3 mt-1">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <span className="text-gray-300">
                        On-premise deployment option
                      </span>
                    </li>
                  </ul>
                  <button className="hover:shadow-[0_0_14px_2px] hover:shadow-white w-full py-3 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition duration-300">
                    Contact Sales
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-6 bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-3xl font-semibold text-center mb-4"
              data-aos="fade-up"
            >
              <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                Trusted by Healthcare Leaders
              </span>
            </h2>
            <p
              className="text-gray-400 text-center mb-16 max-w-2xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              See what our clients have to say about FiltAI's impact on their
              healthcare operations
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div
                className="bg-gray-800 rounded-xl p-6 border border-gray-700"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl mr-4">
                    M
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">
                      Dr. Michael Chen
                    </h4>
                    <p className="text-gray-400 text-sm">
                      CTO, MedFirst Health Network
                    </p>
                  </div>
                </div>
                <p className="text-gray-300 italic">
                  "FiltAI has transformed our patient intake process. We've seen
                  a 42% reduction in specialist reassignments and significantly
                  improved patient satisfaction scores."
                </p>
                <div className="mt-4 flex">
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                </div>
              </div>

              <div
                className="bg-gray-800 rounded-xl p-6 border border-gray-700"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl mr-4">
                    S
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Sarah Johnson</h4>
                    <p className="text-gray-400 text-sm">
                      Director of Operations, TeleHealth Plus
                    </p>
                  </div>
                </div>
                <p className="text-gray-300 italic">
                  "Implementing FiltAI into our telemedicine platform has been a
                  game-changer. Our first-call resolution rate increased by 37%,
                  and our doctors report more accurate initial consultations."
                </p>
                <div className="mt-4 flex">
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                </div>
              </div>

              <div
                className="bg-gray-800 rounded-xl p-6 border border-gray-700"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl mr-4">
                    R
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">
                      Dr. Robert Williams
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Medical Director, Citywide Hospital
                    </p>
                  </div>
                </div>
                <p className="text-gray-300 italic">
                  "The accuracy of FiltAI's matching algorithm is impressive.
                  We've integrated it into our ER triage system and have seen a
                  28% reduction in wait times for critical cases."
                </p>
                <div className="mt-4 flex">
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-6 bg-gradient-to-b from-gray-900 to-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-3xl font-semibold text-center mb-4"
              data-aos="fade-up"
            >
              <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </h2>
            <p
              className="text-gray-400 text-center mb-16 max-w-2xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Everything you need to know about FiltAI
            </p>

            <div className="space-y-6">
              <div
                className="bg-gray-800 rounded-xl p-6 border border-gray-700"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <h3 className="text-xl font-semibold mb-3 text-white">
                  How accurate is FiltAI's matching algorithm?
                </h3>
                <p className="text-gray-300">
                  Our algorithm has been tested with over 10 million patient
                  cases and achieves a 99.2% accuracy rate for matching patients
                  with the appropriate specialist based on symptoms. The system
                  continuously learns and improves with each interaction.
                </p>
              </div>

              <div
                className="bg-gray-800 rounded-xl p-6 border border-gray-700"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <h3 className="text-xl font-semibold mb-3 text-white">
                  Is FiltAI HIPAA compliant?
                </h3>
                <p className="text-gray-300">
                  Yes, FiltAI is fully HIPAA compliant. We implement
                  enterprise-grade security measures including end-to-end
                  encryption, secure data storage, and strict access controls to
                  ensure patient data is protected at all times.
                </p>
              </div>

              <div
                className="bg-gray-800 rounded-xl p-6 border border-gray-700"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <h3 className="text-xl font-semibold mb-3 text-white">
                  How long does it take to integrate FiltAI with our existing
                  systems?
                </h3>
                <p className="text-gray-300">
                  Most clients can integrate FiltAI within 2-4 weeks. We provide
                  comprehensive documentation, SDKs for major programming
                  languages, and dedicated integration support to ensure a
                  smooth implementation process.
                </p>
              </div>

              <div
                className="bg-gray-800 rounded-xl p-6 border border-gray-700"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <h3 className="text-xl font-semibold mb-3 text-white">
                  Can FiltAI be customized for our specific healthcare
                  specialties?
                </h3>
                <p className="text-gray-300">
                  Absolutely. Our Enterprise plan includes custom AI model
                  training that can be tailored to your specific healthcare
                  specialties, patient demographics, and organizational
                  workflows. We work closely with your team to ensure the system
                  meets your unique requirements.
                </p>
              </div>

              <div
                className="bg-gray-800 rounded-xl p-6 border border-gray-700"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                <h3 className="text-xl font-semibold mb-3 text-white">
                  What kind of support do you provide?
                </h3>
                <p className="text-gray-300">
                  We offer tiered support based on your plan. All clients
                  receive email support, while Professional and Enterprise
                  clients receive priority support with faster response times.
                  Enterprise clients benefit from 24/7 dedicated support with a
                  named account manager.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 bg-gradient-to-r from-blue-900 via-gray-800 to-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/api/placeholder/1200/800')] opacity-5 bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-gray-800 to-gray-900 opacity-90"></div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2
              className="text-3xl md:text-4xl font-bold mb-6 text-white"
              data-aos="fade-up"
            >
              Ready to transform your healthcare matching?
            </h2>
            <p
              className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Join hundreds of healthcare providers who are already using FiltAI
              to improve patient outcomes and operational efficiency.
            </p>
            <div
              className="flex flex-col sm:flex-row justify-center gap-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg shadow-blue-500/30 transition duration-300 transform hover:-translate-y-1">
                Start Free Trial
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg transition duration-300">
                Schedule Demo
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent mb-4">
                  FiltAI
                </h3>
                <p className="mb-4">
                  Smart Symptom-to-Doctor Matching API for modern healthcare
                  providers.
                </p>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                    </svg>
                  </a>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-4">Product</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-blue-400 transition">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-400 transition">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-400 transition">
                      API Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-400 transition">
                      Integrations
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-400 transition">
                      Case Studies
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-4">Resources</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-blue-400 transition">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-400 transition">
                      Guides
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-400 transition">
                      Webinars
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-400 transition">
                      Support Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-400 transition">
                      Partners
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-4">Company</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-blue-400 transition">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-400 transition">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-400 transition">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-400 transition">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-400 transition">
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8 text-center">
              <p>
                &copy; {new Date().getFullYear()} FiltAI. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
