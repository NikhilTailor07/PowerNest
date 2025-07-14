import React, { useState } from 'react'

const FounderAndInvester = () => {
 const [role, setRole] = useState('Founder');

  return (
    <div className="flex w-full dark:bg-[#2a2a2a] border-b pb-6"
     style={{
       
        borderBottom: '1px solid var(--stroke-color)',
  
      }}>
       
 <button
          onClick={() => setRole('Founder')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium ${
            role === 'Founder'
              ? 'bg-blue-500 text-white'
              : 'bg-[#9A9A9A] dark:bg-[#2a2a2a] text-gray-800 dark:text-white'
          }`}
        >
          Founder
        </button>
     
        <button
          onClick={() => setRole('Investor')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium ${
            role === 'Investor'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 dark:bg-[#2a2a2a] text-gray-800 dark:text-white'
          }`}
        >
          Investor
        </button>
      

    </div>
  )
}

export default FounderAndInvester