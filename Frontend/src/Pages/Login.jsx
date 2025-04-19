import { useState } from "react"
import { motion } from "framer-motion"

export default function LoginForm({ handleLogin, loginForm, setLoginForm }) {
  const [focusedField, setFocusedField] = useState<string | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700"
    >
      <motion.h2
        className="text-2xl font-bold mb-6 text-white text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Welcome Back
      </motion.h2>

      <form onSubmit={handleLogin} className="space-y-6">
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <label
            htmlFor="loginUsername"
            className={`block mb-2 font-medium transition-all duration-200 ${
              focusedField === "username" ? "text-blue-400" : "text-gray-300"
            }`}
          >
            Username
          </label>
          <div
            className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
              focusedField === "username" ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <input
              type="text"
              id="loginUsername"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none transition-all duration-300"
              value={loginForm.username}
              onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
              onFocus={() => setFocusedField("username")}
              onBlur={() => setFocusedField(null)}
              required
            />
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: "0%" }}
              animate={{ width: focusedField === "username" ? "100%" : "0%" }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <label
            htmlFor="loginPassword"
            className={`block mb-2 font-medium transition-all duration-200 ${
              focusedField === "password" ? "text-blue-400" : "text-gray-300"
            }`}
          >
            Password
          </label>
          <div
            className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
              focusedField === "password" ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <input
              type="password"
              id="loginPassword"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none transition-all duration-300"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
              required
            />
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: "0%" }}
              animate={{ width: focusedField === "password" ? "100%" : "0%" }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="pt-2"
        >
          <motion.button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium shadow-lg hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
            whileTap={{ scale: 0.98 }}
          >
            Sign In
          </motion.button>
        </motion.div>
      </form>

      <motion.div
        className="mt-6 text-center text-sm text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        Secure login protected by 256-bit encryption
      </motion.div>
    </motion.div>
  )
}
