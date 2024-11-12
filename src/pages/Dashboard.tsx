import React, { useEffect, useState } from 'react'
import DashboardLayout from '../components/DashboardLayout';
import SummaryCard from '../components/SummaryCard';
import IncAndExpChart from '../components/IncAndExpChart';
import TransactionsList from '../components/TransactionsList';
import Profile from '../components/Profile';
import Header from '../components/Header';
import Income from '../components/Input/Income';
import Expense from '../components/Input/Expense';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import SavingGoals from '../components/Input/SavingGoals';
import WalletOverview from '../components/WalletOverview';
import CryptoLivePrice from '../components/CryptoLivePrice';
import GoldLivePrice from '../components/GoldLivePrice';
import EmergencyCard from '../components/EmergencyCard';
import { TransactionProps } from '../Utils/types';
import HealthScoreCard from '../components/HealthScoreCard';
import CurrencyExchange from '../components/CurrencyExchange';


interface WalletInfo {
    address: string;
    balance: string;
}

interface DashboardProps {
    handleToggleLogin: () => void;
    setShowLoginForm: (value: boolean) => void;
}


const Dashboard: React.FC<DashboardProps> = ({ handleToggleLogin, setShowLoginForm }) => {

    const [isModalIncome, setIsModalIncome] = useState(false);
    const [isModalExpense, setIsModalExpense] = useState(false);
    const [isModalSaving, setIsModalSaving] = useState(false);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [goal, setGoal] = useState(0);
    const [goalSet, setGoalSet] = useState(false);
    const [totalCurrentSavings, setTotalCurrentSavings] = useState(0);
    const [transactions, setTransactions] = useState<TransactionProps[]>([]);
    const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);
    const [isSideContentOpen, setIsSideContentOpen] = useState(false)
    const [totalEmergencySaving, setTotalEmergencySaving] = useState(0);
    
   
    const notifySuccess = (message: string) => toast.success(message);
    const notifyError = (message: string) => toast.error(message);

    const navigate = useNavigate();
    
    // Load transactions from localStorage
    useEffect(() => {
        const storedTransactions = localStorage.getItem('transactions');
        if (storedTransactions) {
            const parsedTransactions = JSON.parse(storedTransactions);
            setTransactions(parsedTransactions);
            calculateTotals(parsedTransactions);
        }
    },[]);

    // Save transactions to localStorage whenever transactions changed
    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    },[transactions]);

    const calculateTotals = (transactions: TransactionProps[]) => {

        const income = transactions
            .filter((t) => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
        const expense = transactions
            .filter((t) => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
        const saving = transactions
            .filter((t) => t.type === 'saving' && t.currentSavings !== undefined)
            .reduce((sum, t) => sum + (t.currentSavings || 0), 0)
        const emerSaving = transactions
            .filter((t) => t.type === 'emergency')
            .reduce((sum, t) => sum + (t.amount), 0);

        setTotalIncome(income);
        setTotalExpense(expense);
        setTotalCurrentSavings(saving);
        setTotalEmergencySaving(emerSaving);
        console.log('Total income:',income);
        console.log('Total emergency saving:',emerSaving);
        
    };

    const handleToggleIncome = () => {
        setIsModalIncome(true);
    };
    const handleToggleExpense = () => {
        setIsModalExpense(true);
    };
    const handleToggleSaving = () => {
        setIsModalSaving(true);
    };
    const handleToggleSideContent = () => {
        setIsSideContentOpen(!isSideContentOpen)
    };

    const handleAddIncomeAndEmergency = (
        incomeAndEmergencySaving: Omit<TransactionProps, 'id' | 'type'>,
        percentage: number
        ) => {

        const newIncome: TransactionProps = { 
            id: Date.now(), 
            type: 'income', 
            ...incomeAndEmergencySaving 
        };
        const emergencyAmount = (incomeAndEmergencySaving.amount * percentage) / 100;
        const newEmergencySaving: TransactionProps = {
            id: Date.now() + 1, 
            type: 'emergency',
            description: 'Emergency Saving', 
            amount: emergencyAmount,
            date: incomeAndEmergencySaving.date,
        }
        const updatedTransactions = [...transactions, newIncome ,newEmergencySaving];
        setTransactions(updatedTransactions);
        calculateTotals(updatedTransactions);
        setIsModalIncome(false)

        localStorage.setItem('emergencySaving', emergencyAmount.toString());
        console.log('Update Income and EmergencySaving:', updatedTransactions);
        
    }
    
    const handleAddExpense = (expense: Omit<TransactionProps, 'id' | 'type'>) => {
        const newExpense = { 
            id: Date.now(), 
            type: 'expense' as 'expense', 
            ...expense 
        };
        const updatedTransactions = [...transactions, newExpense];
        setTransactions(updatedTransactions);
        calculateTotals(updatedTransactions);
        setIsModalExpense(false)
    };
    const handleAddSaving = (saving: Omit<TransactionProps, 'id' | 'type'>) => {
        const newSaving = {
            id: Date.now(),
            type: 'saving' as const,
            ...saving,
        };
        const updatedTransactions = [...transactions, newSaving];
        setTransactions(updatedTransactions);
        calculateTotals(updatedTransactions);
        setIsModalSaving(false);
        
    };

    const handleUpdateGoal = (newGoal: number) => {
        if (!goalSet) {

            setGoal(newGoal);
            setGoalSet(true);
            localStorage.setItem("goal", JSON.stringify(newGoal));
            localStorage.setItem("goalSet", "true");
        }
       
    };

    const handleResetSaving = () => {
        const updatedTransactions = transactions.filter((transaction) => 
            transaction.type !== 'saving' 
        );
        setTransactions(updatedTransactions);
        calculateTotals(updatedTransactions);
        setGoal(0);
        setGoalSet(false);
        localStorage.removeItem("goal");
        localStorage.removeItem("goalSet");
    };

    const balance = totalIncome - totalExpense
    const balanceColor = balance > 0 ? 'green' : balance < 0 ? 'red' : 'black';

    const handleWalletConnect = async () => {
        
        if (window.ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            try{
                await provider.send('eth_requestAccounts', []);
                const signer = await provider.getSigner();
                const address = await signer.getAddress();

                const balanceWei = await provider.getBalance(address);
                const balance = ethers.formatEther(balanceWei)

                setWalletInfo({ address, balance });
                notifySuccess("Metamask connected successfully!");

            } catch (error) {
                console.log('Wallet connection failed', error);
            }
        } else {
            notifyError('MetaMask is required to connect');
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setWalletInfo(null)
            setShowLoginForm(false)
            console.log('User logged out');
            notifySuccess("Logged out Successful!")
            navigate('/');
        } catch (error) {
            console.log('Logout failed', error);
            
        }
    };

    const handleDisconnect = () => {

            setWalletInfo(null)
            console.log('Wallet Disconnected!');
            notifySuccess("Wallet Disconnected!");
       
    };

    
    useEffect(() => {
        const storedGoal = localStorage.getItem("goal");
        const isGoalSet = localStorage.getItem("goalSet");
        if (storedGoal) {
            setGoal(JSON.parse(storedGoal));
        }
        if (isGoalSet === "true") setGoalSet(true);

    },[]);

    useEffect(() => {
        const savedEmergency = localStorage.getItem('emergencySaving');
        if (savedEmergency) {
            
            setTotalEmergencySaving(parseFloat(savedEmergency));
        }
    }, []);
    
  return (
    <div>
         <Header 
            showLogout={true} 
            handleWalletConnect={handleWalletConnect}
            walletInfo={walletInfo}
            handleLogout={handleLogout}
            handleDisconnect={handleDisconnect}
            handleToggleLogin={handleToggleLogin}
            handleToggleSideContent={handleToggleSideContent}/>
         <DashboardLayout
            isOpen={isSideContentOpen}
            asideContent={
                <>
                {walletInfo ? 
                <WalletOverview 
                    address={walletInfo.address} 
                    balance={walletInfo.balance} /> : null}
                <CryptoLivePrice />
                <GoldLivePrice buy={0} sell={0} date={''} change={0} changeText={''} />
                <CurrencyExchange />
                <Profile />
                </>
                }>
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6'>
                <HealthScoreCard 
                    totalIncome={totalIncome}
                    totalExpense={totalExpense}
                    totalCurrentSavings={totalCurrentSavings}
                    totalEmergencySaving={totalEmergencySaving} />
                <SummaryCard 
                    title="Balance" 
                    amount={totalIncome - totalExpense}
                    goal={goal} 
                    color={balanceColor} />
                {!isModalIncome && (
                    <SummaryCard 
                    title="Total Income" 
                    amount={totalIncome}
                    goal={goal} 
                    color="green"
                    onClick={handleToggleIncome}/>
                )}
                {isModalIncome && 
                    <Income 
                        onAddIncomeAndEmergency={handleAddIncomeAndEmergency}
                        onCancel={() => setIsModalIncome(false)}/>}
                {!isModalExpense && (
                    <SummaryCard 
                    title="Total Expense" 
                    amount={totalExpense} 
                    goal={goal}
                    color="red"
                    onClick={handleToggleExpense}/>
                )}
                {isModalExpense && 
                    <Expense 
                        onAddExpense={handleAddExpense}
                        onCancel={() => setIsModalExpense(false)}/>}
                {!isModalSaving && (
                    <SummaryCard 
                    title="Saving Goals" 
                    amount={totalCurrentSavings} 
                    goal={goal}
                    color="blue"
                    onClick={handleToggleSaving}/>
                )}
                {isModalSaving && 
                    <SavingGoals 
                        onAddSaving={handleAddSaving}
                        handleUpdateGoal={handleUpdateGoal}
                        handleResetSaving={handleResetSaving}
                        goalSet={goalSet}
                        onCancel={() => setIsModalSaving(false)}/>}
                <EmergencyCard 
                    title="Emergency Saving"
                    emergencySaving={totalEmergencySaving}/>
            </div>
            <div className='mb-6'>
                <IncAndExpChart 
                    transactions={transactions}
                    walletInfo={walletInfo} />
            </div>

            <div className='mb-6'>
                <TransactionsList transactions={transactions} />
            </div>
        </DashboardLayout>
    </div>
       

  )
}

export default Dashboard