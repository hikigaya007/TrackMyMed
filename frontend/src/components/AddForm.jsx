import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function AddForm({ formType  , url}) {

  const initialFormData = {
    resident: { name: '', dob: '' },
    medication: { name: '', dosage: '' },
    admin: { residentId: '', medicationId: '', date: '', administeredBy: '' }
  };

  const [loading , setLoading] = useState(false)

  const [residentList , setResidentList] = useState([])
  const [medicationList , setMedicationList] = useState([])

  const fetchResident = async() => {
    
    await axios.get('http://localhost:4000/resident/get-resident')
    .then((res) => {
      setResidentList(res.data)
    })
    .catch((err) => {
      console.log(err)
    })

  }
  const fetchMedication = async() => {

    await axios.get('http://localhost:4000/medication/get-medication')
    .then((res) => {
      setMedicationList(res.data)
    })
    .catch((err) => {
      console.log(err)
    })

  }
  if(formType === 'admin'){

    fetchResident();
    fetchMedication();
  }

  const [error , setError] = useState("")

  const [formData, setFormData] = useState(initialFormData[formType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError("")
    await axios.post(url , formData , {
      headers: {
          'Content-Type': 'application/json'
      },
      withCredentials: true
  })
    .then((res) => {
        console.log(res)
        Swal.fire({
          title: "Added SuccessFully!",
          text: `Record Has been added`,
          icon: "success"
        });
    })
    .catch((err) => {
        console.log(err.response.data.message)
        setError(err.response.data.message)
    })
  };

  const renderFields = () => {
    switch (formType) {
      case 'resident':
        return (
          <>
            <div className='text-2xl uppercase font-bold mb-2'>Add resident</div>
            <div className='flex justify-between w-[420px] gap-3 py-3 items-center'>
              <label className='font-bold text-xl'>Name:</label>
              <input
              placeholder='Enter the name' 
              className='h-[45px] w-[80%] outline text-xl'
              type="text" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div className='flex justify-between w-[420px] gap-3 items-center py-3'>
              <label className='font-bold text-xl'>DOB:</label>
              <input 
              className='h-[45px] w-[80%] outline text-xl'
              type="date" name="dob" value={formData.dob} onChange={handleChange} />
            </div>
          </>
        );
      case 'medication':
        return (
          <div className=''>
            <div className='text-2xl uppercase font-bold mb-2'>Add medication</div>
            <div className='flex justify-between w-[420px] gap-3 py-3 items-center'>
              <label className='font-bold text-xl'>Name:</label>
              <input
              placeholder='Enter Name'  
              className='h-[45px] w-[80%] outline text-xl'
              type="text" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div className='flex justify-between w-[420px] gap-3 items-center py-3'>
              <label className='font-bold text-xl'>Dosage:</label>
              <input
              placeholder='Enter Dosage'  
              className='h-[45px] w-[80%] outline text-xl'
              type="text" name="dosage" value={formData.dosage} onChange={handleChange} />
            </div>
          </div>
        );
      case 'admin':
        return (
          <>
            <div className='text-2xl uppercase font-bold mb-2'>Add Administration record</div>
            <div className='flex justify-between w-[720px] gap-3 py-3 items-center'>
              <label className='font-bold text-xl'>Resident ID</label>
              <select 
              className='h-[45px] w-[80%] border-2 border-black text-xl'
              type="text" name="residentId" value={formData.residentId} onChange={handleChange} >
                <option value="">Select A Resident</option>
                {residentList.map((item) => {
                  return(
                    <option value={item._id} key={item._id}>{item.name}</option>
                  )
                })}
              </select>
            </div>
            <div className='flex justify-between w-[720px] gap-3 py-3 items-center'>
              <label className='font-bold text-xl'>Medication ID</label>
              <select 
              className='h-[45px] w-[80%] border-2 border-black text-xl'
              type="text" name="medicationId" value={formData.medicationId} onChange={handleChange} >
                <option value="">Select Medication</option>
                {medicationList.map((item) => {
                  return(
                    <option value={item._id} key={item._id}>{item.name}</option>
                  )
                })}
              </select>
            </div>
            <div className='flex justify-between w-[720px] gap-3 py-3 items-center'>
              <label className='font-bold text-xl'>Date</label>
              <input 
              className='h-[45px] w-[80%] border-2 border-black text-xl'
              type="date" name="date" value={formData.date} onChange={handleChange} />
            </div>
            <div className='flex justify-between w-[720px] gap-3 py-3 items-center'>
              <label className='font-bold text-xl'>Administered By</label>
              <select 
              className='h-[45px] w-[80%] border-2 border-black text-xl'
              type="text" name="administeredBy" value={formData.administeredBy} onChange={handleChange} >
                <option value="">Select A Nurse</option>
                <option value="Nurse A">Nurse A</option>
                <option value="Nurse B">Nurse B</option>
                <option value="Nurse C">Nurse C</option>
              </select>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-5'>
      {renderFields()}
      <button 
      className='bg-black text-white font-semibold text-lg p-2 rounded-lg'
      type="submit">Submit</button>
      {error && <span className='font-semibold'>{error}</span>}
    </form>
  );
}

export default AddForm;
