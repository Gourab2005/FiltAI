import React from 'react'

const Login = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center bg-gray-950'>
      <div className='w-[500px] h-[450px] bg-gray-800 mt-[50px] rounded-2xl shadow-[0_0_20px_2px] shadow-white hover:shadow-[0_0_25px_2px] hover:shadow-teal-400 hover:scale-105 transition-all duration-500 ease-in-out p-8'>
        <h1 className='text-teal-400 text-4xl text-center font-bold mb-10'>Login</h1>
        <form className='flex flex-col gap-6'>
          <input
            type='email'
            placeholder='Email'
            className='p-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 transition'
          />
          <input
            type='password'
            placeholder='Password'
            className='p-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 transition'
          />
          <button
            type='submit'
            className='bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-xl transition-all duration-300'
          >
            Sign In
          </button>
          <p className='text-sm text-gray-400 text-center'>
            Don't have an account? <a href='#' className='text-teal-400 hover:underline'>Sign up</a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
