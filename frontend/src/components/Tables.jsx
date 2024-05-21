import React, { useState } from 'react'

function Tables({id , data , tableHeading}) {

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString();
  };

  return (
      <table className="table-auto w-full border-collapse border border-gray-400">
        <thead>
          <tr className='text-xl uppercase'>
            {tableHeading.map((item  , index) => {
              return(
                <th className='border border-gray-400' key={index}>{item}</th>
              )
            })}
          </tr>
        </thead>
        <tbody className='font-semibold text-lg'>
          {id != 'admin' && data.map((item , index) => {
            return(
              <tr key={item._id}>
                <td className='border border-gray-400 text-center'>{item._id}</td>
                <td className='border border-gray-400 text-center'>{ item.name}</td>
                <td className='border border-gray-400 text-center'>{id === 'resident'?formatDate(item.dob) : item.dosage}</td>
              </tr>
            )
          })}
          {id === 'admin' && data.map((item , index) => {
            return(
              <tr key={item._id}>
                <td className='border border-gray-400 text-center'>{item._id}</td>
                <td className='border border-gray-400 text-center'>{ item.residentId}</td>
                <td className='border border-gray-400 text-center'>{item.medicationId}</td>
                <td className='border border-gray-400 text-center'>{item.date}</td>
                <td className='border border-gray-400 text-center'>{item.administeredBy}</td>
              </tr>
            )
          })}
        </tbody>
    </table>
  )
}

export default Tables