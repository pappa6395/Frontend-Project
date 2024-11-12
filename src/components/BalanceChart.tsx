import React from 'react'
import { Bar } from 'react-chartjs-2'
import { TransactionProps } from '../Utils/types';
import { processTransactionsForCharts } from '../Utils/chartUtils';
import { ChartData, ChartOptions } from 'chart.js';


interface BalanceChartProps {
    transactions: TransactionProps[];
    selectedYear: number;
    currentYear: number;
    handleYearChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const BalanceChart: React.FC<BalanceChartProps> = ({ 
    transactions, 
    selectedYear, 
    currentYear,
    handleYearChange }) => {

    const { balanceData } = processTransactionsForCharts(transactions, selectedYear);

    const chartOptions: ChartOptions<'bar'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'bottom' },
            tooltip: { 
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                boxPadding: 4,
             }
        },
        scales: {
            y: { beginAtZero: false }
        }
    };

  return (

    <div className='container'>
        <div className=''>
            <label htmlFor="year-select" className='text-sm font-semibold text-gray-600'>Select Year:</label>
            <select 
                id="year-select" 
                value={selectedYear} 
                onChange={handleYearChange}
                className='border border-gray-300 w-[6rem] rounded px-2 py-1 '>
                {[...Array(10)].map((_, index) => {
                    const year = currentYear - index;
                    return <option key={year} value={year}>{year}</option>
                })}
            </select>
            <div 
                className='w-full h-[30vh] lg:max-w-4xl mx-auto md:px-8 sm:px-6 mt-5 
                hover:scale-105 transition transform ease-in-out duration-200'>
                <Bar 
                    data={balanceData as ChartData<'bar'>} 
                    options={chartOptions}/>
            </div>
        </div>

    </div>

  )
}

export default BalanceChart