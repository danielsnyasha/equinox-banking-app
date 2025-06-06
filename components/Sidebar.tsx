'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { sidebarLinks } from '@/constants'
import {
    TrendingUp,
    ShieldCheck,
    Globe,
    Briefcase,
    Banknote,
    CreditCard,
    Users,
    Settings,
} from 'lucide-react'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { motion } from 'framer-motion'

const extraLinks = [
    { label: 'Banking Hub', route: '/banking-hub', icon: Banknote },
    { label: 'Cards', route: '/cards', icon: CreditCard },
    { label: 'Team', route: '/team', icon: Users },
    { label: 'Settings', route: '/settings', icon: Settings },
    { label: 'Investments', route: '/investments', icon: TrendingUp },
    { label: 'Security Center', route: '/security-center', icon: ShieldCheck },
    { label: 'Forex', route: '/forex', icon: Globe },
    { label: 'Business Solutions', route: '/business-solutions', icon: Briefcase },
] as const

const allLinks = [...sidebarLinks, ...extraLinks]

const Sidebar = ({ user }: SiderbarProps) => {
    const pathname = usePathname()
    const [dateTime, setDateTime] = useState<string>('')

    useEffect(() => {
        const updateTime = () => {
            const now = new Date()
            // Example: 2025-06-05 20:31:08 GMT+2
            setDateTime(
                now
                    .toLocaleString(undefined, {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false,
                    })
                    .replace(',', '') +
                ' ' +
                Intl.DateTimeFormat().resolvedOptions().timeZone
            )
        }
        updateTime()
        const interval = setInterval(updateTime, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <section className="sidebar flex h-full flex-col justify-between">
            <TooltipProvider>
                <nav className="flex flex-col gap-1">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="mb-10 mt-4 flex items-center gap-3 pl-2 select-none"
                    >
                        <Image
                            alt="logo"
                            src="/logo.svg"
                            width={34}
                            height={34}
                            className="size-[24px] max-xl:size-14"
                        />
                        <span className="sidebar-logo text-lg font-bold">Equinox</span>
                    </Link>
                    {/* Nav items */}
                    {allLinks.map((item, idx) => {
                        const isActive =
                            pathname === item.route ||
                            pathname.startsWith(`${item.route}/`)

                        // Lucide icon for extraLinks, Image for core sidebarLinks
                        const Icon = (item as any).icon

                        return (
                            <Tooltip key={item.label} delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <motion.div
                                        whileHover={{ scale: 1.08 }}
                                        whileTap={{ scale: 0.97 }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 24 }}
                                    >
                                        <Link
                                            href={item.route}
                                            className={cn(
                                                'sidebar-link group  flex transition-all',
                                                isActive
                                                    ? 'bg-bank-gradient  text-white shadow mx-10 md:mx-10 lg:mx-10 xl:mx-0 2xl:mx-0'
                                                    : 'hover:bg-gray-100',
                                                'relative'
                                            )}
                                        >

                                            {Icon ? (
                                                <Icon
                                                    className={cn(
                                                        'size- pl-2 flex-shrink-0 transition-colors duration-200',
                                                        isActive ? 'text-white pl-2' : 'text-gray-600 group-hover:text-bank-gradient'
                                                    )}
                                                />
                                            ) : (
                                                <div className="relative aspect-square w-5 h-5">
                                                    <Image
                                                        src={item.imgURL}
                                                        alt={item.label}
                                                        fill
                                                        className={cn(
                                                            'object-contain transition-all',
                                                            isActive && 'brightness-[3] invert-0'
                                                        )}
                                                    />
                                                </div>
                                            )}
                                            <span
                                                className={cn(
                                                    'text-sm sidebar-label whitespace-nowrap max-xl:hidden transition-all duration-200',
                                                    isActive && '!text-white'
                                                )}
                                            >
                                                {item.label}
                                            </span>
                                        </Link>
                                    </motion.div>
                                </TooltipTrigger>
                                <TooltipContent side="right" className="capitalize font-medium">
                                    {item.label}
                                </TooltipContent>
                            </Tooltip>
                        )
                    })}
                </nav>
            </TooltipProvider>

            {/* Current date, time, and timezone at the bottom */}
            <div className="w-full px-3 py-4 text-[12px] text-purple-400 select-none text-center border-t border-gray-100 font-mono tracking-tighter">
                <span>{dateTime}</span>
            </div>
        </section>
    )
}

export default Sidebar
