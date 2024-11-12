import React from 'react'
import { Pie } from 'react-chartjs-2'
import { ChartData, ChartOptions } from 'chart.js'


interface ExpenseChartProps {
    data: ChartData<'pie'>;
    options: ChartOptions<'pie'>;
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ data, options }) => {

  return (

    <div>
        <Pie data={data} options={options} />
    </div>

  )
}

export default ExpenseChart