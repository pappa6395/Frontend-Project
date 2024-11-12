import React, { useState } from 'react'
import { Line, Doughnut } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  BarController,
  ChartOptions,
  ChartData,
  TooltipItem,
} from 'chart.js';
import { Loader2 } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';
import { TransactionProps } from '../Utils/types';
import BalanceChart from './BalanceChart';
import { processTransactionsForCharts } from '../Utils/chartUtils';
import IncomeChart from './IncomeChart';
import ExpenseChart from './ExpenseChart';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  BarController,
)

interface WalletInfoProp {
  address: string;
  balance: string;
}

interface IncAndExpChartProps {
  transactions: TransactionProps[];
  walletInfo: WalletInfoProp | null;
}

const ChartWrapper: React.FC<{
    title: string;
    loading?: boolean;
    children: React.ReactNode;
    className?: string;
  }> = ({ title, loading, children, className }) => (
    <div className={`flex flex-col bg-white rounded-lg p-4 shadow-md ${className}`}>
      <h2 className='text-lg font-semibold mb-4'>{title}</h2>
      {loading ? (
        <div className='flex items-center justify-center h-[200px]'>
          <Loader2 className='h-8 w-8 animate-spin text-gray-500' />
        </div>
      ) : children }
    </div>
  )

const IncAndExpChart: React.FC<IncAndExpChartProps> = ({ transactions = [], walletInfo}) => {

  if (!transactions || transactions.length === 0) {
    return (
      <div className='p-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          <ChartWrapper title="Total Balance" className='lg:col-span-2'>
            <div className='flex items-center justify-center h-[200px]'>
                No transaction data available
            </div>
          </ChartWrapper>
        </div>
      </div>
    )
  }

  // Wallet Web3 chart and data
  const coinData: ChartData<'line'> = {
    labels: ['ETH'],
    datasets: [{
        label: 'Wallet Web3 Balance',
        data: [parseFloat(walletInfo?.balance || "0")],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
    }]
    };

  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const {  
    incomeData, 
    expenseData, 
    savingGoalData,
  } = processTransactionsForCharts(transactions, selectedYear);

  
  const commonOptions: Partial<ChartOptions<any>> = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        boxPadding: 4,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
      }
    }
  }

  const pieOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1,
    layout: {
      padding: {
        top: 5,
        bottom: 5,
        left: 10,
        right: 0
      }
    },
    plugins: {
      legend: {
        position: 'right',
        labels: {
          padding: 10,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.parsed;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: ฿${value.toFixed(2)} (${percentage}%)`;
          }
        }
      }
    },
    hover: {
      mode: 'nearest', // hover mode
      intersect: true,
    }
  };

  const doughnutOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1,
    layout: {
      padding: {
      top: 20,
      bottom: 20,
      left: 20,
      right: 20,
      }
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          padding: 10,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 15,
        boxPadding: 10,
        callbacks: {
          label: function(context: TooltipItem<'doughnut'>) {
             return `${context.label}: ${context.parsed.toFixed(1)}%`;
          }
        }
      }
    },
    cutout: '70%'
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(parseInt(event?.target.value))
}

  return (
    <div className='p-4 ml-[-10px]'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-x-2 gap-3'>
          
          <ChartWrapper title="Total Balance" className='lg:col-span-2'>
            
            <BalanceChart
              transactions={transactions}
              selectedYear={selectedYear}
              currentYear={currentYear}
              handleYearChange={handleYearChange} />
          </ChartWrapper>

          <ChartWrapper title="Income Breakdown">
            <IncomeChart data={incomeData} options={pieOptions}/>
          </ChartWrapper>

          <ChartWrapper title="Expense Breakdown">
            <ExpenseChart data={expenseData} options={pieOptions}/>
          </ChartWrapper>

          <ChartWrapper title="Saving Goal">
            <Doughnut data={savingGoalData} options={doughnutOptions}/>
          </ChartWrapper>

          <ChartWrapper title="Wallet Balance">
            <Line data={coinData} options={commonOptions}/>
          </ChartWrapper>

        </div>
    </div>

  )
}

export default IncAndExpChart;