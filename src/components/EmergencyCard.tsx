import React from 'react'

interface EmergencyCardProps {
    title: string;
    emergencySaving: number;
}

const EmergencyCard: React.FC<EmergencyCardProps> = ({ title, emergencySaving }) => {

    
  return (

    <div 
        className={`p-4 shadow-md rounded-lg cursor-pointer transition-all 
        duration-300 ease-in-out hover:scale-105 hover:shadow-lg
        bg-orange-50 text-orange-400 hover:bg-orange-100`}
        >
        <div className='-my-2'>
            <h3 className="text-lg font-medium md:text-xl;">{title}</h3>
        </div>
        <div className='bg-gray-50 outline-none rounded-lg shadow-md mt-3 py-1 px-1'>
            <p className="text-xl md:text-2xl font-semibold">&#3647;{emergencySaving.toLocaleString()}</p>
        </div>
    </div>

  )
}

export default EmergencyCard