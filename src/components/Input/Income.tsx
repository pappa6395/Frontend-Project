import React, { useState } from 'react';
import { TransactionProps } from '../../Utils/types';


type TransactionInputProps = Omit<TransactionProps, 'id' | 'type'>;

interface IncomeProps {
    onAddIncomeAndEmergency: (transactions: TransactionInputProps, percentage: number) => void;
    onCancel: () => void;
}
interface FormErrorProps {
    description: string;
    amount: string;
    percentage: string;
    date: string;
}

const Income: React.FC<IncomeProps> = ({ onAddIncomeAndEmergency, onCancel}) => {

    const [description, setDescription] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [date, setDate] = useState<string>('');
    const [percentage, setPercentage] = useState<number>(0);
    const [errors, setErrors] = useState<FormErrorProps>({
        description: '',
        amount: '',
        percentage: '',
        date: ''
    })

    const handleAddBothTransactions = () => {

        let formErrors = { ...errors };

        if (!description) {
            formErrors.description = 'Description is required';
        } else {
            formErrors.description = '';
        }
        if (!amount) {
            formErrors.amount = 'Description is required';
        } else {
            formErrors.amount = '';
        }
        if (!percentage) {
            formErrors.percentage = 'Description is required';
        } else {
            formErrors.percentage = '';
        }
        if (!date) {
            formErrors.date = 'Description is required';
        } else {
            formErrors.date = '';
        }

        if (description && amount && date && percentage) {
            const newTransaction: TransactionInputProps = {
                description,
                amount,
                date
            }
            
            onAddIncomeAndEmergency(newTransaction, percentage)
        
            setDescription('');
            setAmount(0);
            setDate('');
            setPercentage(0);

        }

    setErrors(formErrors)

    };

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='income-container bg-green-50 rounded-lg shadow-md w-full max-w-md p-6'>
                <h2 className='text-xl font-semibold text-green-600 mb-4'>
                    Add Income
                </h2>
                <div className='mb-2'>
                    <label className='font-semibold text-gray-500'>Description:</label>
                    <input 
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        className='w-full p-2 border border-green-300 
                        rounded-lg focus:outline-none focus:ring focus:ring-green-200'/>
                        {errors.description && <p className='text-red-500 text-xs'>{errors.description}</p>}
                </div>
                <div className='mb-2'>
                <label className='font-semibold text-gray-500'>Amount:</label>
                    <input 
                        type="number"
                        value={amount}
                        onChange={(e) => {setAmount(parseFloat(e.target.value))}}
                        placeholder="Amount"
                        className='w-full p-2 border border-green-300 
                        rounded-lg focus:outline-none focus:ring 
                        focus:ring-green-200'/>
                        {errors.amount && <p className='text-red-500 text-xs'>{errors.amount}</p>}
                </div>
                <div className='mb-2'>
                    <label className='font-semibold text-gray-500'>Emergency Saving %</label>
                    <input 
                        type="number"
                        min="0"
                        max="100"
                        value={percentage}
                        onChange={(e) => {setPercentage(Number(e.target.value))}}
                        placeholder="Emergency Saving %"
                        className='w-full p-2 border border-green-300 
                        rounded-lg focus:outline-none focus:ring 
                        focus:ring-green-200'/>
                        {errors.percentage && <p className='text-red-500 text-xs'>{errors.percentage}</p>}
                </div>
                <div className='mb-2'>
                    <label className='font-semibold text-gray-500'>Date:</label>
                    <input 
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className='w-full p-2 border border-green-300 
                        rounded-lg focus:outline-none focus:ring 
                        focus:ring-green-200'/>
                        {errors.date && <p className='text-red-500 text-xs'>{errors.date}</p>}
                </div>
               
            
                <div className='flex justify-between'>
                    <button 
                        onClick={handleAddBothTransactions}
                        className='w-32 bg-green-600 text-white py-2 
                        rounded hover:bg-green-700 transition'>
                        Add Income
                    </button>
                    <button 
                        onClick={onCancel}
                        className='w-32 bg-gray-400 text-white py-2 
                        rounded hover:bg-gray-600 transition'>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Income