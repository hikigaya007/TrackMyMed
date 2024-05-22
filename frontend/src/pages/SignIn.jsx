import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { signIn } from '../redux/user/userSlice'
import Swal from 'sweetalert2'

function SignIn() {

  const [formData , setFormData] = useState({
    username: "" ,
    password: ""
  })

  const [loading , setLoading] = useState(false)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
    await axios.post(`http://localhost:4000/auth/sign-in` , formData , {
      headers: {
          'Content-Type': 'application/json'
      },
      withCredentials: true
  })
    .then((res) => {
      console.log(res)
      dispatch(signIn(res.data))
      setLoading(false)
      navigate('/resident')
      
    })
    .catch((err) => {
      Swal.fire({
        title: "Failed",
        text: err.response.data.message,
        icon: "error"
      });
      setLoading(false)
      console.log(err)
    })

  }

  return (
    <>
        <Navbar/>
        <div className="w-screen h-[700px] flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-lg font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => setFormData({...formData , username: e.target.value})}
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-lg font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={(e) => setFormData({...formData , password: e.target.value})}
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full  rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="flex w-full justify-center rounded-md bg-green-600 p-2 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? "Loading...": "Sign In"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-md text-gray-500">
            Create a account?{' '}
            <Link to={'/sign-up'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Click here
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default SignIn