'use client'

import { formatAmount } from '@/lib/utils'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Copy from './Copy'

/* --------------------------------------------------------------
   Accent util — returns ring + beam + amount colour classes
---------------------------------------------------------------- */
type Accent = {
  beam: string // bg gradient mid-colour     e.g. 'rgba(34,211,238,0.3)'
  rim:  string // ring hover colour          e.g. '#22d3ee'
  amount: string // Tailwind text-colour     e.g. 'text-cyan-300'
}
const palette: Record<string, Accent> = {
  gold : { beam: 'rgba(253,224,71,0.3)', rim: '#fde047', amount: 'text-yellow-300' },
  cyan : { beam: 'rgba(34,211,238,0.3)', rim: '#22d3ee', amount: 'text-cyan-300' },
  violet: { beam: 'rgba(167,139,250,0.3)', rim: '#a78bfa', amount: 'text-violet-300' },
  emerald: { beam: 'rgba(52,211,153,0.3)', rim: '#34d399', amount: 'text-emerald-300' },
  rose: { beam: 'rgba(244,114,182,0.3)', rim: '#f472b6', amount: 'text-rose-300' },
}

/* -------------------------------------------------------------- */
interface Props extends CreditCardProps {
  accentKey?: keyof typeof palette // optional palette name
  baseZ?: number                   // starting z-index (for stacking)
}
/* -------------------------------------------------------------- */
const BankCard = ({
  account,
  userName,
  showBalance = true,
  accentKey = 'gold',
  baseZ = 0,
}: Props) => {
  const {
    name,
    currentBalance,
    mask,
    appwriteItemId,
    sharaebleId,
    cvc = '●●●',
  } = account

  // fall-back to gold if unknown key
  const accent = palette[accentKey] ?? palette.gold

  return (
    <div className="flex flex-col">
      <Link
        href={`/transaction-history/?id=${appwriteItemId}`}
        className="group [perspective:1200px]"
      >
        {/* parent zoom */}
        <motion.div
          whileHover={{ scale: 1.15 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          className="h-[212px] w-[336px] select-none"
          style={{ zIndex: baseZ }}
        >
          {/* inner 3-D wrapper (flips + lifts z-index) */}
          <motion.div
            initial={false}
            whileHover={{ rotateY: 180, zIndex: 60 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="relative h-full w-full [transform-style:preserve-3d]"
          >
            {/* ---------- FRONT ---------- */}
            <div className="absolute inset-0 overflow-hidden rounded-[12px] bg-gradient-to-br from-[#0d0d0f] via-[#13151b] to-[#1c1c23] shadow-[0_14px_38px_-12px_rgba(0,0,0,0.8)] ring-1 ring-zinc-800/70 [backface-visibility:hidden]">
              {/* dynamic rim */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[12px] ring-0 transition-all duration-300 group-hover:ring-2"
                style={{ boxShadow: `0 0 0 2px ${accent.rim}` }}
              />

              {/* accent beam  */}
              <div
                className="pointer-events-none absolute -top-24 -left-28 h-[360px] w-[360px] -rotate-45 blur-2xl opacity-20 group-hover:opacity-40"
                style={{
                  background:
                    `linear-gradient(90deg, transparent 0%, ${accent.beam} 50%, transparent 100%)`,
                }}
              />

              {/* micro texture */}
              <div className="pointer-events-none absolute inset-0 bg-[url('/textures/noise.svg')] bg-cover opacity-20 mix-blend-overlay" />

              {/* gold chip */}
              <div className="absolute right-6 top-6">
                <div className="h-9 w-12 rounded-[4px] bg-gradient-to-tr from-yellow-300 to-yellow-100 shadow-inner" />
              </div>

              {/* FRONT content */}
              <div className="flex h-full flex-col justify-between px-6 py-5">
                <header className="flex flex-col gap-1">
                  <h2 className="text-sm font-semibold text-white/90">
                    {name}
                  </h2>
                  <p
                    className={`font-ibm-plex-serif text-2xl font-extrabold tracking-tight ${accent.amount}`}
                  >
                    {formatAmount(currentBalance)}
                  </p>
                </header>

                <section className="flex flex-col gap-3">
                  <p className="text-lg tracking-widest text-white/90">
                    ●●●● ●●●● ●●●● <span>{mask}</span>
                  </p>
                  <div className="flex justify-between text-xs text-white/70">
                    <span className="font-medium uppercase tracking-wider">
                      {userName}
                    </span>
                    <span className="font-medium">●● / ●●</span>
                  </div>
                </section>

                <footer className="flex items-center gap-5">
                  <Image
                    src="/icons/Paypass.svg"
                    alt="paypass"
                    width={24}
                    height={28}
                    className="opacity-90"
                  />
                  <Image
                    src="/icons/mastercard.svg"
                    alt="mastercard"
                    width={50}
                    height={36}
                    className="opacity-90"
                  />
                </footer>
              </div>
            </div>

            {/* ---------- BACK ---------- */}
            <div className="absolute inset-0 rounded-[12px] overflow-hidden bg-gradient-to-br from-[#111215] via-[#1b1d22] to-[#24262d] ring-1 ring-zinc-800/70 text-white [transform:rotateY(180deg)] [backface-visibility:hidden]">
              {/* mag-stripe */}
              <div className="mt-6 h-10 w-full bg-gradient-to-r from-[#3a3d44] to-[#1e2026]" />

              {/* signature panel + CVC */}
              <div className="mx-6 mt-6 flex h-10 items-center justify-between rounded-[4px] bg-white px-4">
                <span className="text-[10px] font-medium tracking-wider text-gray-500">
                  AUTHORIZED SIGNATURE
                </span>
                <span className="text-lg font-bold tracking-widest text-gray-900">
                  {cvc}
                </span>
              </div>

              {/* footer info */}
              <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-[10px] text-gray-400">
                <span>Equinox • {accentKey.toUpperCase()}</span>
                <span>24h Support • +1&nbsp;800&nbsp;000&nbsp;000</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Link>

      {showBalance && <Copy title={sharaebleId} />}
    </div>
  )
}

export default BankCard
