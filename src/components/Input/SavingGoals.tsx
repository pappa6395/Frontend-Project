import React, { useEffect, useState } from 'react'

interface Transaction {
    id: number;
    type: 'income' | 'expense' | 'saving';
    description: string;
    amount: number;
    goal: number;
    currentSavings: number;
    date: string;
}

interface SavingGoalProps {
    onAddSaving: (
        saving: Transaction) => void;
        onCancel: () => void;
        handleResetSaving: () => void;    
        handleUpdateGoal: (newGoal: number) => void;
        goalSet: boolean;
}

interface FormErrorProps {
    description: string;
    goal: string;
    currentSavings: string;
    date: string;
}

const SavingGoals: React.FC<SavingGoalProps> = ({ 
    onAddSaving, 
    onCancel, 
    handleResetSaving, 
    handleUpdateGoal, 
    goalSet}) => {

    const [description, setDescription] = useState<string>('');
    const [currentSavings, setCurrentSavings] = useState<number>(0);
    const [date, setDate] = useState<string>('');
    const [goal, setGoal] = useState<number>(0);
    const [errors, setErrors] = useState<FormErrorProps>({
        description: '',
        goal: '',
        currentSavings: '',
        date: '',
    })

    const handleAddSaving = () => {

        let formErrors = { ...errors };
        let isValid = true;

        if (!description) {
            formErrors.description = 'Description is required';
            isValid = false;
        } else {
            formErrors.description = '';
        }
        if (!goal && !goalSet) {
            formErrors.goal = 'Goal amount is required and must be a valid positive number';
            isValid = false;
        } else {
            formErrors.goal = '';
        }
        if (!currentSavings || isNaN(currentSavings) || currentSavings < 0) {
            formErrors.currentSavings = 'Current saving is required and must be a valid number';
            isValid = false;
        } else {
            formErrors.currentSavings = '';
        }
        if (!date) {
            formErrors.date = 'Date is required';
            isValid = false;
        } else {
            formErrors.date = '';
        }

        if (isValid) {

            const currentDescription = goalSet 
            ? localStorage.getItem('savedGoalDescription') 
            || description : description;
    
            if (!goalSet && description) {
                localStorage.setItem('savedGoalDescription', description);
            }
    
            const newSaving: Transaction = {
                id: Date.now(),
                type: 'saving',
                description: currentDescription,
                amount: 0,
                goal,
                currentSavings,
                date
            };
    
            onAddSaving(newSaving);
            setGoal(goal);
            setCurrentSavings(0);
            setDate('');
        }
       
        setErrors(formErrors);
    };

    const handleSavingGoal = () => {
        if (goal) {
            handleUpdateGoal(goal);
        }
    };

    useEffect(() => {
        if (goalSet) {
            const storedDescription = localStorage.getItem('savedGoalDescription');
            if (storedDescription) {
                setDescription(storedDescription);
            }
        }
    }, [goalSet]);


  return (

    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
        <div className='saving-container p-6 bg-blue-50 rounded-lg shadow-md w-full max-w-md'>
            <h3 className='text-xl font-semibold text-blue-600 mb-4'>
                Saving Goal
            </h3>
            <div className='mb-3'>
                <label className='text-sm font-semibold text-blue-500'>Goal Description:</label>
                <input 
                    type="text"
                    value={description}
                    placeholder="Enter description"
                    onChange={(e) => {setDescription(e.target.value)}}
                    disabled={goalSet}
                    className='w-full p-2 border border-blue-300 
                    rounded-lg focus:outline-none focus:ring 
                    focus:ring-blue-200'
                    />
                {errors.description && <p className='text-red-500 text-xs'>{errors.description}</p>}
            </div>
            <div className='mb-3'>
            <label className='text-sm font-semibold text-blue-500'>Goal Amount:</label>
                <input 
                    type="number"
                    value={goal}
                    placeholder="Enter your Goal!"
                    onChange={(e) => {setGoal(parseFloat(e.target.value))}}
                    disabled={goalSet}
                    className='w-full p-2 border border-blue-300 
                    rounded-lg focus:outline-none focus:ring 
                    focus:ring-blue-200'
                    />
                {errors.goal && <p className='text-red-500 text-xs'>{errors.goal}</p>}
            </div>
            <div className='mb-3'>
                <label className='text-sm font-semibold text-blue-500'>Current saving:</label>
                <input 
                    type="number"
                    value={currentSavings}
                    placeholder="Enter current savings"
                    onChange={(e) => {setCurrentSavings(parseFloat(e.target.value))}}
                    className='w-full p-2 border border-blue-300 
                    rounded-lg focus:outline-none focus:ring 
                    focus:ring-blue-200'
                    />
                {errors.currentSavings && <p className='text-red-500 text-xs'>{errors.currentSavings}</p>}
            </div>
            <div className='mb-3'>
            <label className='text-sm font-semibold text-blue-500'>Date:</label>
                <input 
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className='w-full p-2 border border-blue-300 
                    rounded-lg focus:outline-none focus:ring 
                    focus:ring-blue-200' 
                    />
                {errors.date && <p className='text-red-500 text-xs'>{errors.date}</p>}
            </div>
           
            <div className='flex justify-between'>
                <button 
                    onClick={() => {handleAddSaving(); handleSavingGoal();}}
                    className='w-20 text-xs bg-blue-500 text-white py-2 
                    rounded hover:bg-blue-700 transition'>
                    Add Saving
                </button>
                <button 
                    onClick={onCancel}
                    className='w-20 text-xs bg-gray-400 text-white py-2 
                    rounded hover:bg-gray-600 transition'>
                    Cancel
                </button>
                <button 
                    onClick={handleResetSaving}
                    className='w-20 text-xs bg-red-400 text-white py-2 
                    rounded hover:bg-red-600 transition'>
                    Reset
                </button>
            </div>
        </div>
    </div>
  )
}

export default SavingGoals