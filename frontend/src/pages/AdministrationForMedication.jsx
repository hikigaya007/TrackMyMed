import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import axios from 'axios'
import Tables from '../components/Tables'
import { useNavigate } from 'react-router-dom'

function AdministrationForMedication() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
}, [])

    const [medication , setMedication] = useState([])

    const [selectedMedication , setSelectedMedication] = useState("");

    const [tableData , setTableData] = useState(["checking"]);

    const tableHeading = [  "Id" ,"ResidentId" , "MedicationId" , "Date" , "AdministeredBy"]

    const [loading , setLoading] = useState(false)

    const navigate = useNavigate()

  useEffect(()=> {

    const fetchData = async() => {

      await axios.get(`http://localhost:4000/medication/get-medication`)
      .then((res) => {
        console.log(res)
        setMedication(res.data)
      })
      .catch((err) => {
        console.log(err)
      })

    }

    fetchData();

  } , [])

  const handleSearch = async(e) => {
    e.preventDefault();
    setLoading(true)
    setTableData([])
    await axios.get(`http://localhost:4000/administration/administrations-for-medication/${selectedMedication}`)
    .then((res) => {
        console.log(res)
        setLoading(false)
        setTableData(res.data)
    })
    .catch((err) => {
        console.log(err)
        setLoading(false)
    })

  }


  return (
    <>
        <Navbar/>
          <div className='flex'>
            <Sidebar/>
            <div className='flex flex-col p-7 w-full gap-6'>
              <div className='w-full flex justify-between items-center'>
                <div className='uppercase font-bold text-3xl'>Manage Administration record for medication</div>
                <button 
                onClick={() => navigate('/administration')}
                className= ' cursor-pointer bg-black p-3 rounded-lg text-white text-xl font-semibold'>{'<-'} Back</button>
              </div>
              <div className='flex flex-col gap-5 w-full'>
                <div className='font-bold text-xl'>
                    Select a medication
                </div>
                <form className='flex gap-5 items-center'>
                    <select
                    disabled ={loading} 
                    onChange={(e) => setSelectedMedication(e.target.value)}
                    className='h-[45px] w-[40%] outline text-xl' name="" id="">
                        <option value="">Select A Medication</option>
                        {medication.map((item) => {
                            return(
                                <option key={item._id} value={item._id}>{item.name}</option>
                            )
                        })}
                    </select>
                    <button
                    onClick={handleSearch} 
                    className='bg-black text-white text-lg font-semibold p-3 rounded-xl'
                    type='submit'>Search</button>
                </form>
              </div>
              {loading && <span className='text-green-700 text-lg font-semibold'>Loading please wait...</span>}
              <div>
                {tableData.length !== 0 ? <Tables id = 'admin' data = {tableData} tableHeading = {tableHeading}  /> : <span className='text-red-700 font-bold text-xl'>No Record found !!!</span>}
              </div>
            </div>
          </div>
      </>
  )
}

export default AdministrationForMedication