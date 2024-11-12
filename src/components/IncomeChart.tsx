import React from 'react'
import { Pie } from 'react-chartjs-2'
import { ChartData, ChartOptions } from 'chart.js'


interface IncomeProps {
    data: ChartData<'pie'>;
    options: ChartOptions<'pie'>
}

const IncomeChart: React.FC<IncomeProps> = ({ data, options }) => {

  return (

    <div>
        <Pie data={data} options={options} />
    </div>

  )
}

export default IncomeChart