import { TransactionProps } from "./types";
import { ChartData } from "chart.js";


export const processTransactionsForCharts = (
    transactions: TransactionProps[] = [], 
    selectedYear: number
    ) => {

    const yearlyData: { [year: string]: { [month: string]: { income: number; expense: number } } } = {};
    const monthOrder = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

    const expenseCategories: { [key: string]: number } = {
      'Rent': 0,
      'Food' : 0,
      'Transport': 0,
      'Other': 0
    };
    const incomeCategories: { [key: string]: number } = {
      'Salary': 0,
      'Freelance': 0,
      'Part-Time': 0,
      'Other': 0
    }
  
    console.log('Initial expense categories:', expenseCategories);
    console.log('Processing transactions:', transactions);
    
    //update income and expense
    transactions.forEach(transaction => {
  
      const date = new Date(transaction.date);
      const yearKey = date.getFullYear().toString();
      const monthKey = date.toLocaleString('default', { month: 'long' });
  
      if (!yearlyData[yearKey]) {
        yearlyData[yearKey] = monthOrder.reduce((acc, m) => {
            acc[m] = { income: 0, expense: 0};
            return acc;
        }, {} as {[month: string]: { income: number; expense: number}});
      }
      
      if (transaction.type === 'expense') {
        const category = transaction.description.toLowerCase();
        let expenseCategory = 'Other';
  
        if (category.includes('rent') || 
            category.includes('housing') ||
            category.includes('condo')) {
          expenseCategory = 'Rent';
  
        } else if (category.includes('food') || 
          category.includes('supermarket') || 
          category.includes('restaurant') ||
          category.includes('grocery')) {
          expenseCategory = 'Food';

        } else if (category.includes('transport') || 
          category.includes('fuel') || 
          category.includes('taxi') || 
          category.includes('grab') || 
          category.includes('bts')) {
          expenseCategory = 'Transport';
        }

        expenseCategories[expenseCategory] += transaction.amount;
        yearlyData[yearKey][monthKey].expense += transaction.amount;
  
        console.log(`Processed expense: ${transaction.description}`);
        console.log(`Category: ${expenseCategory}`);
        console.log(`Amount: ${transaction.amount}`);
        console.log('Updated expense categories:', expenseCategories);
  
    
      } else if (transaction.type === 'income') {

        const category = transaction.description.toLowerCase();
        let incomeCategory = 'Other';
  
        if (category.includes('salary') || 
            category.includes('bonus') ||
            category.includes('overtime')) {
          incomeCategory = 'Salary';
  
        } else if (category.includes('freelance') || 
          category.includes('agency') || 
          category.includes('insurance') ||
          category.includes('social media')) {
          incomeCategory = 'Freelance';
  
        } else if (category.includes('part-time') || 
          category.includes('restaurant') || 
          category.includes('delivery') || 
          category.includes('clean up') || 
          category.includes('night club')) {
          incomeCategory = 'Part-Time';
        }
  
        incomeCategories[incomeCategory] += transaction.amount;
        yearlyData[yearKey][monthKey].income += transaction.amount;
        console.log('Income amount:', transaction.amount);
        
      }
  
    });
  
    // BalanceData for bar-chart
    const selectedYearData = yearlyData[selectedYear.toString()] || {};
    const balanceData: ChartData<'bar'> = {
      labels: monthOrder,
      datasets: [
        {
          label: 'Income',
          data: monthOrder.map((month) =>  selectedYearData[month]?.income || 0),
          backgroundColor: 'rgba(34, 197, 94, 0.6)',
          borderRadius: 4,
        },
        {
          label: 'Expense',
          data: monthOrder.map((month) => selectedYearData[month]?.expense || 0),
          backgroundColor: 'rgba(34, 150, 243, 0.6)',
          borderRadius: 4,
        }
      ]
    };
    
    // incomeData for pie-chart
    const incomeData: ChartData<'pie'> = {
      labels: Object.keys(incomeCategories),
      datasets: [
        {
          data: Object.values(incomeCategories),
          backgroundColor: [
            'rgba(16, 185, 129, 0.8)',
            'rgba(59, 130, 246, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(236, 72, 153, 0.8)',
          ],
          borderColor: [
            'rgba(16, 185, 129, 1)',
            'rgba(59, 130, 246, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(236, 72, 153, 1)',
          ],
          borderWidth: 1,
          hoverOffset: 10,
          hoverBackgroundColor: [
            'rgba(16, 185, 129, 0.8)',
            'rgba(59, 130, 246, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(236, 72, 153, 0.8)',
          ],
          hoverBorderColor: '#000',
          hoverBorderWidth: 3,
        }
      ]
    };
    
    // expenseData for pie-chart
    const expenseData: ChartData<'pie'> = {
      labels: Object.keys(expenseCategories),
      datasets: [
        {
          data: Object.values(expenseCategories),
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
          hoverOffset: 10,
          hoverBackgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
          ],
          hoverBorderColor: '#000',
          hoverBorderWidth: 3,
        }
      ]
    };
    
    
    // Saving Goals
    const totalGoal = parseFloat(localStorage.getItem('goal') || '0');
    const currency = "฿";
  
    const savingsTransactions = transactions.filter(t => t.type === 'saving');
    const currentSavings = savingsTransactions.reduce((sum, transaction) =>
       sum + (transaction.currentSavings || 0), 0)
  
    const remainingSavings = Math.max(0, totalGoal - currentSavings);
  
    const achievedPercentage = totalGoal > 0 ? Math.min(100, (currentSavings / totalGoal) * 100) : 0;
    const remainingPercentage = Math.max(0, 100 - achievedPercentage)
  
  
    const savingGoalData: ChartData<'doughnut'> = {
      labels: [
          `Achieved (${currency}${currentSavings.toLocaleString()})`, 
          `Remaining (${currency}${remainingSavings.toLocaleString()})`
          ],
      datasets: [
        {
          data: [
            achievedPercentage,
            remainingPercentage
          ],
          backgroundColor: [
            'rgba(46, 204, 113, 0.9)',
            'rgba(231, 76, 60, 1)',
          ],
          borderWidth: 0,
          hoverOffset: 4,
        }
      ]
    };
  
    console.log('Total expenses by category:', expenseCategories);
    console.log('Generated expense data:', expenseData);

    
    
    return { balanceData, incomeData, expenseData, savingGoalData};
  }

  