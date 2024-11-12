import React, { useEffect, useState } from 'react';
import millonaire from './Asset/millionaire.png';
import healthy from './Asset/healthy.png';
import moderate from './Asset/moderate.png';
import danger from './Asset/danger.png';

interface HealthScoreCardProps {
    totalIncome: number;
    totalExpense: number;
    totalCurrentSavings: number;
    totalEmergencySaving: number;
}


const HealthScoreCard: React.FC<HealthScoreCardProps> = ({ totalIncome, totalExpense, totalCurrentSavings, totalEmergencySaving }) => {

    const [healthScore, setHealthScore] = useState<number>(0);
    const [status, setStatus] = useState<'Millionaire' | 'Healthy' | 'Moderate' | 'Danger!!'>('Healthy')

    useEffect(() => {
        const incomeScore = (totalIncome > 0) ? Math.min((totalIncome - totalExpense) / totalIncome, 1) * 50 : 0;
        const savingProgress = (totalCurrentSavings > 0) ? Math.min(totalEmergencySaving / totalCurrentSavings, 1) * 50: 0;

        const calculatedScore = incomeScore + savingProgress;
        const roundedScore = Math.round(calculatedScore);

        setHealthScore(roundedScore);

        if (roundedScore === 100) {
            setStatus('Millionaire');
        } else if (roundedScore > 70) {
            setStatus('Healthy');
        } else if (roundedScore > 50) {
            setStatus('Moderate')
        } else {
            setStatus('Danger!!')
        }

    }, [totalIncome, totalExpense, totalCurrentSavings, totalEmergencySaving]);

    const getStatusIcon = () => {
        switch (status) {
            case 'Millionaire':
                return <img src={millonaire} alt="millionaire"/>;
            case 'Healthy':
                return <img src={healthy} alt="millionaire"/>;
            case 'Moderate':
                return <img src={moderate} alt="millionaire"/>;
            case 'Danger!!':
                return <img src={danger} alt="millionaire"/>;
            default:
                return '';
        }
    }

  return (

    <div 
        className={`health-score-card flex flex-row justify-between p-4 shadow-md rounded-lg cursor-pointer transition-all 
        duration-300 ease-in-out hover:scale-105 hover:shadow-lg
        ${status === 'Millionaire' ? 'bg-yellow-100' 
            : status === 'Healthy' ? 'bg-green-100' 
            : status === 'Moderate' ? 'bg-gray-100'
            : 'bg-red-200'
        }`}>
        <div className={`flex flex-col ${status === 'Millionaire' ? 'text-yellow-400' 
                : status === 'Healthy' ? 'text-green-400' 
                : status === 'Moderate' ? 'text-gray-600'
                : 'text-red-500'}`}>
            <h3 className="text-lg flex font-semibold md:text-xl;">Financial Health Score</h3>
            
            <p className={`text-2xl md:text-3xl font-bold 
                `}>{healthScore}</p>
            <p>
                {status === 'Millionaire' ? 'Millionaire' : status.charAt(0) + status.slice(1)}
            </p>
            
        </div>
        <div className='status-icon w-16 sm:w-16'>
            {getStatusIcon()}
            </div>
        
    </div>

  )
}

export default HealthScoreCard