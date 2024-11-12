import React, { useState } from 'react'

const Carousel: React.FC = () => {

    const heroText = [
        "Manage your income, expense, savings goals, and investments all in one place.",
        "Get detailed insights, set personalized goals and track your progress toward financial stability.",
        " Connect your wallet for real-time crypto tracking and experience secure, easy-to-use financial management."
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextText = () => {
        setCurrentIndex((prevIndex) => (prevIndex +1) % heroText.length);
    };
    const prevText = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + heroText.length) % heroText.length)
    }


  return (


    <div className='max-w-2xl mx-auto'>
        <div>
            <p className='text-xl font-semibold mb-4 text-gray-600'>{heroText[currentIndex]}</p>
        </div>
        <div className='translate-y-3'>
                <button 
                    onClick={prevText} 
                    className='absolute left-4 mx-2 my-2 -translate-y-1/2
                    bg-gray-500 text-white p-2 rounded-full opacity-75 
                    hover:opacity-100 transition-transform'
                    >
                    &#10094;
                </button>
                <button 
                    onClick={nextText} 
                    className='absolute right-4 my-2 mx-2 -translate-y-1/2 
                    bg-gray-500 text-white p-2 rounded-full opacity-75 
                    hover:opacity-100 transition-transform'
                    >
                    &#10095;
                </button>
            <div className='absolute left-1/2 transform -translate-x-1/2 flex space-x-2'>
                {heroText.map((_, index) => (
                    <span 
                        key={index} 
                        className={`w-3 h-3 rounded-full ${index === currentIndex 
                        ? "bg-white" : "bg-gray-500"}`}
                    ></span>
                ))}
            </div>
        </div>
    </div>


  )
}

export default Carousel