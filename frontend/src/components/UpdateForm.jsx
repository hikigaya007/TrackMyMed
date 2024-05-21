import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateForm({ formType, url, data }) {
  const initialFormData = {
    resident: { name: '', dob: '' },
    medication: { name: '', dosage: '' },
    admin: { residentId: '', medicationId: '', date: '', administeredBy: '' }
  };

  const [updateId, setUpdateId] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState(initialFormData[formType]);

  useEffect(() => {
    if (updateId) {
      const selectedRecord = data.find(record => record._id === updateId);
      if (selectedRecord) {
        setFormData({
          ...selectedRecord,
          dob: selectedRecord.dob ? formatDate(selectedRecord.dob) : ''
        });
      }
    } else {
      setFormData(initialFormData[formType]);
    }
  }, [updateId, data, formType]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    await axios.put(`${url}/${updateId}`, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setError(err.response.data.message);
      });
  };

  const renderFields = () => {
    switch (formType) {
      case 'resident':
        return (
          <>
            <div className='text-2xl uppercase font-bold mb-2'>Update Resident</div>
            <div className='flex justify-between w-[420px] gap-3 py-3 items-center'>
              <label className='font-bold text-xl'>Select Resident:</label>
              <select
                onChange={(e) => setUpdateId(e.target.value)}
                className='h-[45px] w-[80%] outline text-xl'
                value={updateId}
              >
                <option value="">Select an option</option>
                {data.map((item) => (
                  <option key={item._id} value={item._id}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className='flex justify-between w-[420px] gap-3 py-3 items-center'>
              <label className='font-bold text-xl'>Name:</label>
              <input
                placeholder='Enter the name'
                className='h-[45px] w-[80%] outline text-xl'
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className='flex justify-between w-[420px] gap-3 items-center py-3'>
              <label className='font-bold text-xl'>DOB:</label>
              <input
                className='h-[45px] w-[80%] outline text-xl'
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
          </>
        );
      case 'medication':
        return (
          <div className=''>
            <div className='text-2xl uppercase font-bold mb-2'>Update Medication</div>
            <div className='flex justify-between w-[420px] gap-3 py-3 items-center'>
              <label className='font-bold text-xl'>Select Resident:</label>
              <select
                onChange={(e) => setUpdateId(e.target.value)}
                className='h-[45px] w-[80%] outline text-xl'
                value={updateId}
              >
                <option value="">Select an option</option>
                {data.map((item) => (
                  <option key={item._id} value={item._id}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className='flex justify-between w-[420px] gap-3 py-3 items-center'>
              <label className='font-bold text-xl'>Name:</label>
              <input
                placeholder='Enter Name'
                className='h-[45px] w-[80%] outline text-xl'
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className='flex justify-between w-[420px] gap-3 items-center py-3'>
              <label className='font-bold text-xl'>Dosage:</label>
              <input
                placeholder='Enter Dosage'
                className='h-[45px] w-[80%] outline text-xl'
                type="text"
                name="dosage"
                value={formData.dosage}
                onChange={handleChange}
              />
            </div>
          </div>
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
        type="submit"
      >
        Submit
      </button>
      {error && <span className='font-semibold'>{error}</span>}
    </form>
  );
}

export default UpdateForm;
