'use client'

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const Doughnut = dynamic(
  () => import('react-chartjs-2').then(m => m.Doughnut),
  { ssr: false }
)

interface Account {
  name: string
  currentBalance: number
}

interface DoughnutChartProps {
  accounts: Account[]
}

const bankLabels = ['FNB', 'Barclays', 'Investec']
const colors = ['#2E6BFF', '#f22853', '#70dd72', '#FF4FA3', '#6172F3', '#f545e3']

const DoughnutChart: React.FC<DoughnutChartProps> = ({ accounts }) => {
  const [showPowered, setShowPowered] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShowPowered(false), 2500)
    return () => clearTimeout(t)
  }, [])

  const balances = bankLabels.map(
    l => accounts.find(a => a.name === l)?.currentBalance ?? 0
  )
  const allZero = balances.every(b => b === 0)
  const chartData = allZero ? [1250, 2680, 4789] : balances

  const data = {
    labels: bankLabels,
    datasets: [
      {
        label: 'Banks',
        data: chartData,
        backgroundColor: colors,
        borderWidth: 2,
      },
    ],
  }

  const options = {
    cutout: '60%',
    plugins: { legend: { display: false }, tooltip: { enabled: true } },
    responsive: true,
    maintainAspectRatio: false,
  }

  return (
    <div className="pl-20 pb-2 relative flex flex-col items-center w-full">
      <div style={{ width: 120, height: 120 }}>
        <Doughnut data={data} options={options} />
      </div>

      {/* legend */}
      <ul className="mt-4 flex gap-4">
        {bankLabels.map((label, i) => (
          <li key={label} className="flex items-center gap-1 text-xs">
            <span
              style={{
                backgroundColor: colors[i],
                width: 10,
                height: 10,
                display: 'inline-block',
                borderRadius: 2,
              }}
            />
            {label}
          </li>
        ))}
      </ul>

      {/* Animated Powered by Chart.js - always visible in parent card */}
      <div className="pointer-events-none">
        <span
          className={`
            fixed
            left-1/2
            bottom-6
            -translate-x-1/2
            text-[10px] text-gray-400 bg-white/80 px-2 rounded
            transition-opacity duration-500
            ${showPowered ? 'opacity-100' : 'opacity-0'}
          `}
          style={{
            zIndex: 9999,
            animation: showPowered
              ? 'fade-in-out 2.5s linear'
              : undefined,
          }}
        >
          Powered by Chart.js
        </span>
      </div>
      <style jsx global>{`
        @keyframes fade-in-out {
          0% { opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}

export default DoughnutChart
