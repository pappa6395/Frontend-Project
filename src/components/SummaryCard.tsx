import React from "react";

interface SummaryCardProps {
    title: string;
    amount: string | number;
    goal: number;
    color: string;
    onClick?: () => void;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, amount, goal, color, onClick }) => {

    return (

        <div 
            className={`p-4 shadow-md rounded-lg cursor-pointer transition-all 
            duration-300 ease-in-out hover:scale-105 hover:shadow-lg
            ${color === 'green' ? 'bg-green-50 text-green-600 hover:bg-green-100' : ''}
            ${color === 'blue' ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' : ''}
            ${color === 'red' ? 'bg-red-50 text-red-600 hover:bg-red-100' : ''}`}
            onClick={onClick}>
            <div className='-my-2'>
                <h3 className="text-lg font-medium md:text-xl;">{title}</h3>
            </div>
            <div className="bg-gray-50 outline-none rounded-lg shadow-md mt-3 py-1 px-1">
                {title === 'Saving Goals' 
                ? (<p className="text-xl md:text-2xl font-semibold">&#3647;{amount.toLocaleString()} / {goal.toLocaleString()}</p>) 
                : (<p className="text-xl md:text-2xl font-semibold">&#3647;{amount.toLocaleString()}</p>)}
            </div>
        </div>

    )
}

export default SummaryCard;