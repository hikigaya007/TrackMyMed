import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2';
import { signOut } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

function Navbar() {

  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignOut = async(e) => {
    e.preventDefault();
    await axios.post('http://localhost:4000/auth/sign-out' , {
      headers: {
          'Content-Type': 'application/json'
      },
      withCredentials: true
  })
    .then((res) => {
      console.log(res)
      dispatch(signOut())
      navigate('/')

    })
    .catch((err) => {
      console.log(err)
      Swal.fire({
        title: "Failed",
        text: "Could'nt Signout",
        icon: "error"
      });
    })
  }

  return (
    <div className='h-[70px] bg-green-500 flex justify-between items-center p-4 border-b border-b-black'>
        <div className='font-bold text-2xl'>
            TrackMyMed
        </div>
        {currentUser && <div>
            <button
            onClick={handleSignOut}  
            className='bg-black p-2 rounded-lg font-semibold text-white'>Sign Out</button>
        </div>}
    </div>
  )
}

export default Navbar