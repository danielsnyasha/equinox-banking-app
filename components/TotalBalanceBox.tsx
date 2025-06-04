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
      {/* doughnut */}
      <motion.div
        className="total-balance-chart flex-shrink-0 mr-56"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <DoughnutChart accounts={accounts} />
      </motion.div>

      {/* text block with fade-in */}
      <motion.div
        className="flex flex-1 flex-col justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
      >
        <h2 className="header-2 text-sm font-semibold">Bank Accounts: {totalBanks}</h2>

        <div>
          <p className="total-balance-label">Total Current Balance</p>
          <p className="total-balance-amount flex items-center gap-2">
            <AnimatedCounter value={totalCurrentBalance} />
          </p>
        </div>

        {/* tiny blinking helper text */}
        <p className="text-xs text-gray-500 animate-pulse">
          Balances auto-refresh
        </p>
      </motion.div>
    </section>
  )
}

export default TotalBalanceBox
