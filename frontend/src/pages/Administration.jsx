import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import AddForm from '../components/AddForm';
import { useNavigate } from 'react-router-dom';

function Administration() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
    }, [])

    const navigate = useNavigate()

    const [showAdd , setShowAdd] = useState(false)
  
    return (
      <>
          <Navbar/>
          <div className='flex'>
            <Sidebar/>
            <div className='flex flex-col p-7 w-full gap-6'>
              <div className='w-full flex justify-between items-center'>
                <div className='uppercase font-bold text-3xl'>Manage Administration record</div>
                <div className='flex gap-4'>
                  <button 
                  onClick={() => {setShowAdd(!showAdd)}}
                  className='p-2 bg-green-400 text-lg rounded-lg font-semibold'>Add Record</button>
                </div>
              </div>
              <div className='flex flex-col gap-5 w-full h-full items-center justify-center'>
                <button 
                onClick={() => navigate('/administration/resident')}
                className='bg-green-500 p-2 text-white rounded-lg text-2xl font-semibold'>Administration Record For Resident</button>
                <button 
                onClick={() => navigate('/administration/medication')}
                className='bg-green-500 p-2 text-white rounded-lg text-2xl font-semibold'>Administration Record For Medication</button>
              </div>
            </div>
          </div>
         {showAdd &&  <div className='absolute top-[30%] left-[36%] right-auto bottom-auto bg-green-400 shadow-lg p-5 border border-gray-300'>
              <AddForm formType={'admin'} url={`http://localhost:4000/administration//add-administration-record`}/>
              <button 
              onClick={() =>setShowAdd(!showAdd)}
              className='bg-red-500 p-2 uppercase font-bold ms-4'> Cancel</button>
          </div>}
      </>
    )
}

export default Administration