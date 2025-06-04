'use client'

import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend)

interface DoughnutChartProps {
  accounts: { name: string; currentBalance: number }[]
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ accounts }) => {
  const data = {
    labels: accounts.map(acc => acc.name),
    datasets: [
      {
        label: 'Banks',
        data: [1250, 2680, 4789],
        backgroundColor: [
          '#2E6BFF',
          '#FF4FA3',
          '#6172F3',
          '#175CD3',
          '#039855',
          '#FFB946',
          '#C11574',
          '#851651',
        ],
        borderWidth: 2,
      },
    ],
    labels: ['FNB', 'Investec', 'Capitek']
  }

  const options = {
    cutout: '70%',
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    responsive: true,
    maintainAspectRatio: false,
  }

  return (
    <div style={{ width: 120, height: 120 }}>
      <Doughnut data={data} options={options} />
    </div>
  )
}

export default DoughnutChart
