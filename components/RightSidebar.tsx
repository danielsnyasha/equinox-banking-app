'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'
import BankCard from './BankCard'

/* Palette: first gold, others shuffled */
const accentKeys = ['gold', 'cyan', 'violet', 'emerald', 'rose']
const accents = accentKeys
  .slice(1)
  .sort(() => 0.5 - Math.random())
accents.unshift('gold')

const RightSidebar = ({ user, banks }: RightSidebarProps) => (
  <aside className="right-sidebar">
    {/* -------- Profile -------- */}
    <section>
      <div className="profile-banner" />
      <div className="profile">
        <div className="profile-img">
          <span className="text-5xl font-bold text-purple-500">
            {user.firstName[0]}
          </span>
        </div>
        <div className="profile-details">
          <h1 className="profile-name text-purple-950">
            {user.firstName} {user.lastName}
          </h1>
          <p className="profile-email">{user.email}</p>
        </div>
      </div>
    </section>

    {/* -------- Banks -------- */}
    <section className="banks">
      <div className="flex w-full justify-between">
        <h2 className="header-2">My Banks</h2>
        <Link href="/" className="flex gap-2">
          <Image src="/icons/plus.svg" width={20} height={20} alt="add-bank" />
          <h2 className="text-14 font-semibold text-gray-600">Add Bank</h2>
        </Link>
      </div>

      {banks?.length > 0 && (
        <div className="relative flex flex-1 items-start justify-center">
          {banks.slice(0, 3).map((b, i) => {
            /* slight offset so each card is visible */
            const offsetY = i * 28   // 28 px down each layer
            const offsetX = i * -20  // 20 px left each layer

            return (
              <motion.div
                key={b.$id}
                className="absolute"
                style={{
                  transform: `translate(${offsetX}px, ${offsetY}px)`,
                  zIndex: 20 - i,                    // base layer order
                }}
                whileHover={{ zIndex: 60 }}           // ← lifts THIS card on hover
              >
                <BankCard
                  account={b}
                  userName={`${user.firstName} ${user.lastName}`}
                  accentKey={accents[i % accents.length] as any}
                  baseZ={10 - i}
                />
              </motion.div>
            )
          })}
        </div>
      )}
    </section>
  </aside>
)

export default RightSidebar
