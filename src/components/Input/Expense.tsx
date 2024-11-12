import React, { useState } from 'react';

interface ExpenseProps {
    onAddExpense: (
        expense: { 
            id: number;
            type: 'expense';
            description: string;
            amount: number;
            goal?: number;
            currentSavings?: number; 
            date: string }) => void;
            onCancel: () => void;
}
interface FormErrorProps {
    description: string;
    amount: string;
    date: string;
}

const Expense: React.FC<ExpenseProps> = ({ onAddExpense, onCancel }) => {

    const [description, setDescription] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [date, setDate] = useState<string>('');
    const [errors, setErrors] = useState<FormErrorProps>({
        description: '',
        amount: '',
        date: ''
    })

    const handleAddExpense = () => {

        let formErrors = { ...errors };

        if (!description) {
            formErrors.description = 'Description is required';
        } else {
            formErrors.description = '';
        }
        if (!amount) {
            formErrors.amount = 'Amount is required';
        } else {
            formErrors.amount = '';
        }
        if (!date) {
            formErrors.date = 'Date is required';
        } else {
            formErrors.date = '';
        }

        if (description && amount && date) {
            const id = Math.floor(Math.random() * 10000);
            const type: 'expense' = 'expense';

            onAddExpense({ id, type, description, amount, date});
            setDescription('');
            setAmount(0);
            setDate('');
        }

        setErrors(formErrors)
    };

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='expense-container bg-red-50 rounded-lg shadow-md w-full max-w-md p-6'>
                <h2 className='text-xl font-semibold text-red-600 mb-4'>
                    Add Expense
                </h2>
                <div className='mb-3'>
                <label className='font-semibold text-gray-500'>Description:</label>
                    <input 
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        className='w-full p-2 border border-red-300 
                        rouned-lg focus:outline-none focus:ring focus:ring-red-200'/>
                        {errors.description && <p className='text-red-500 text-xs'>{errors.description}</p>}
                </div>
                <div className='mb-3'>
                <label className='font-semibold text-gray-500'>Amount:</label>
                    <input 
                        type="number"
                        value={amount}
                        onChange={(e) => {setAmount(parseFloat(e.target.value))}}
                        placeholder="Amount"
                        className='w-full p-2 border border-red-300 
                        rounded-lg focus:outline-none focus:ring 
                        focus:ring-red-200'/>
                        {errors.amount && <p className='text-red-500 text-xs'>{errors.amount}</p>}
                </div>
                <div className='mb-3'>
                <label className='font-semibold text-gray-500'>Date:</label>
                    <input 
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className='w-full p-2 border border-red-300 
                        rounded-lg focus:outline-none focus:ring 
                        focus:ring-red-200'/>
                        {errors.date && <p className='text-red-500 text-xs'>{errors.date}</p>}
                </div>
                <div className='flex justify-between'>
                    <button 
                        onClick={handleAddExpense}
                        className='w-32 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition'>
                        Add Expense
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

export default Expense;