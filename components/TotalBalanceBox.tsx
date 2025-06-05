'use client'

import { formatAmount } from '@/lib/utils'
import React from 'react'
import AnimatedCounter from './AnimatedCounter'
import DoughnutChart from './DoughnutChart'
import { motion } from 'framer-motion'

const TotalBalanceBox = ({
  accounts = [],
  totalBanks,
  totalCurrentBalance,
}: TotalBalanceBoxProps) => {
  return (
    <section className="total-balance flex items-center justify-between gap-6 rounded-xl border border-gray-200 p-4 shadow-chart sm:gap-6 sm:p-6">
      {/* ───────────────────── Doughnut (unchanged) ───────────────────── */}
      <motion.div
        className="total-balance-chart mr-44 flex-shrink-0"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <DoughnutChart accounts={accounts} />
      </motion.div>

      {/* ───────────────────── Text block ───────────────────── */}
      <motion.div
        className="flex flex-1 flex-col justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
      >
        {/* Bank accounts */}
        <h2 className="font-semibold leading-tight text-xs sm:text-sm md:text-base">
          Bank&nbsp;Accounts:&nbsp;{totalBanks}
        </h2>

        {/* Total balance */}
        <div className="flex flex-col">
          <p className="total-balance-label text-xs sm:text-sm md:text-base">
            Total&nbsp;Current&nbsp;Balance
          </p>
          <p className="total-balance-amount flex items-center gap-2 text-red-800 whitespace-nowrap text-14 sm:text-xl md:text-2xl">
            <AnimatedCounter value={totalCurrentBalance} />
          </p>
        </div>

        {/* tiny blinking helper text */}
        <p className="animate-pulse text-[10px] sm:text-xs text-gray-500">
          Balances auto-refresh
        </p>
      </motion.div>
    </section>
  )
}

export default TotalBalanceBox
