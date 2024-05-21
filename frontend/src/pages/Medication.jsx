import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Tables from '../components/Tables';
import axios from 'axios'
import AddForm from '../components/AddForm';

function Medication() {

  const tableHeading = ['Id','Name','Dosage'];

  const [showAdd , setShowAdd] = useState(false)

  const [tableData , setTableData] = useState([])

  useEffect(()=> {

    const fetchData = async() => {

      await axios.get(`http://localhost:4000/medication/get-medication`)
      .then((res) => {
        console.log(res)
        setTableData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })

    }

    fetchData();

  } , [])

  return (
    <>
        <Navbar/>
        <div className='flex'>
          <Sidebar/>
          <div className='flex flex-col p-7 w-full gap-6'>
            <div className='w-full flex justify-between items-center'>
              <div className='uppercase font-bold text-3xl'>Manage Medication</div>
              <div className='flex gap-4'>
                <button 
                onClick={() => {setShowAdd(!showAdd)}}
                className='p-2 bg-green-400 rounded-lg'>Add Medication</button>
                <button className='p-2 bg-green-400 rounded-lg'>Update Medication</button>
              </div>
            </div>
            <div className=''>
              <Tables id = 'medication' data = {tableData} tableHeading = {tableHeading}  />
            </div>
          </div>
        </div>
       {showAdd &&  <div className='absolute top-[40%] left-[40%] right-auto bottom-auto bg-green-400 shadow-lg p-5 border border-gray-300'>
            <AddForm formType={'medication'} url={`http://localhost:4000/medication/add-medication`}/>
            <button 
            onClick={() =>setShowAdd(!showAdd)}
            className='bg-red-500 p-2 uppercase font-bold ms-4'> Cancel</button>
        </div>}
    </>
  )
}

export default Medication