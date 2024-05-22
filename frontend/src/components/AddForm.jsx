import React, { useState } from 'react';
import axios from 'axios';

function AddForm({ formType  , url}) {

  const initialFormData = {
    resident: { name: '', dob: '' },
    medication: { name: '', dosage: '' },
    admin: { residentId: '', medicationId: '', date: '', administeredBy: '' }
  };

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
    })
    .catch((err) => {
        // console.log(err)
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
            <div>
              <label>Resident ID</label>
              <input type="text" name="residentId" value={formData.residentId} onChange={handleChange} />
            </div>
            <div>
              <label>Medication ID</label>
              <input type="text" name="medicationId" value={formData.medicationId} onChange={handleChange} />
            </div>
            <div>
              <label>Date</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} />
            </div>
            <div>
              <label>Administered By</label>
              <input type="text" name="administeredBy" value={formData.administeredBy} onChange={handleChange} />
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
