import React, { useState } from "react";
import { TransactionProps } from "../Utils/types";
import { formatDate } from "../Utils/formatDate";

interface TransactionListProps {
    transactions: TransactionProps[];
}

const TransactionsList: React.FC<TransactionListProps> = ({ transactions }) => {

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filterType, setFilterType] = useState<string>('');
    const [selectMonth, setSelectMonth] = useState<{ month: string; year: string}>({
        month: 'all',
        year: 'all',
    });

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => 
        setSearchQuery(e.target.value);
    const handleFilterTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => 
        setFilterType(e.target.value);
    
    const formattedTransactions = transactions.map(transaction => ({
        ...transaction,
        formattedDate: formatDate(transaction.date),
        dateObj: new Date(transaction.date)
    }));

    const filteredTransactions = formattedTransactions.filter((transaction) => {
        const matchSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchType = filterType ? transaction.type === filterType : true;

        const transactionMonth = (transaction.dateObj.getMonth() + 1).toString();
        const transactionYear = (transaction.dateObj.getFullYear()).toString();

        const matchMonth = selectMonth.month === 'all' || transactionMonth === selectMonth.month;
        const matchYear = selectMonth.year === 'all' || transactionYear === selectMonth.year;
        
        return (
            
            matchSearch &&
            matchType &&
            matchMonth &&
            matchYear

        )
    });

    // Sort filtered transactions by date (newest to oldest)
    const sortedTransactions = [...filteredTransactions].sort((a, b) => 
        b.dateObj.getTime() - a.dateObj.getTime()
    );

    // Get unique years from transactions for the year filter
    const uniqueYears = Array.from(new Set(
        formattedTransactions.map(t => t.dateObj.getFullYear())
    )).sort((a, b) => b - a);

    return (
        <div className="bg-white overflow-scroll h-60 shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
            <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4 mb-4">
                <input 
                    type="text" 
                    placeholder="Search by description" 
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"/>
                <select 
                    value={filterType} 
                    onChange={handleFilterTypeChange} 
                    className="w-full md:w-1/4 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200">
                    <option value="">All Types</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                    <option value="saving">Saving</option>
                </select>
                <div className="flex space-x-2 w-full md:w-1/3">
                    <select 
                        value={selectMonth.month} 
                        onChange={(e) => 
                            setSelectMonth((prev) => 
                                ({...prev, month: e.target.value}))}
                        className="w-full p-2 border borer-gray-300 rounded-md focus:ring focus:ring-blue-200"
                         ><option value="all">All Months</option>
                        {Array.from({ length: 12}, (_, i) => (
                            <option key={i + 1} value={i + 1}>
                                {new Date(2024, i).toLocaleString('default', { month: 'long'})}
                            </option>
                        ))}
                    </select>
                    <select  
                        value={selectMonth.year} 
                        onChange={(e) => 
                            setSelectMonth((prev) => 
                                ({...prev, year: e.target.value}))}
                        className="w-full p-2 border borer-gray-300 rounded-md focus:ring focus:ring-blue-200"
                         ><option value="all">All Years</option>
                        {uniqueYears.map(year => (
                            <option key={year} value={String(year)}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <table className="w-full">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTransactions.length > 0 ? (
                        sortedTransactions.map(transaction => (
                            <tr key={transaction.id} className="border-t">
                                <td>{transaction.description}</td>
                                <td className={`text-${transaction.type === 'income' 
                                ? 'green-600' 
                                : transaction.type === 'expense' 
                                ? 'red-600' : 'blue-600'} text-center`}>
                                    ฿{transaction.type === 'saving' ? transaction.currentSavings : transaction.amount}
                                </td>
                                <td className="text-center">{transaction.type}</td>
                                <td className="text-center">{transaction.formattedDate}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="text-gray-500 p-4 text-center">
                                No transactions match the filter criteria
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default TransactionsList