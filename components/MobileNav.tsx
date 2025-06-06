'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Menu,
  Settings,
  Banknote,
  Users,
  CreditCard,
  TrendingUp,
  ShieldCheck,
  Globe,
  Briefcase,
} from 'lucide-react'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { sidebarLinks } from '@/constants'

/* Tabs to match the Sidebar, in order */
const extraLinks = [
  { label: 'Banking Hub',        route: '/banking-hub',    icon: Banknote },
  { label: 'Cards',              route: '/cards',      icon: CreditCard },
  { label: 'Team',               route: '/team',       icon: Users },
  { label: 'Settings',           route: '/settings',   icon: Settings },
  { label: 'Investments',        route: '/investments',icon: TrendingUp },
  { label: 'Security Center',    route: '/security',   icon: ShieldCheck },
  { label: 'Forex',              route: '/forex',      icon: Globe },
  { label: 'Business Solutions', route: '/business',   icon: Briefcase },
] as const

const allLinks = [...sidebarLinks, ...extraLinks]

interface MobileNavProps {
  user?: unknown
}

const MobileNav = ({ user }: MobileNavProps) => {
  const pathname = usePathname()

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        {/* ───────── Trigger ───────── */}
        <SheetTrigger asChild>
          <Menu className="h-7 w-7 cursor-pointer text-black-1" />
        </SheetTrigger>

        {/* ───────── Drawer ───────── */}
        <SheetContent className="flex flex-col border-none bg-white px-5 py-6">
          {/* Title */}
          <SheetHeader className="mb-6">
            <SheetTitle className="text-lg font-semibold text-black-1">
              Menu
            </SheetTitle>
          </SheetHeader>

          {/* Logo */}
          <Link href="/" className="mb-8 inline-flex items-center gap-3">
            <Image src="/logo.svg" alt="logo" width={34} height={34} />
            <h1 className="font-ibm-plex-serif text-2xl font-bold text-black-1">
              Equinox
            </h1>
          </Link>

          {/* ---------------- All matching links ---------------- */}
          <nav className="flex flex-col gap-1">
            {allLinks.map((item) => {
              const isActive =
                pathname === item.route || pathname.startsWith(`${item.route}/`)

              const Icon = (item as any).icon

              return (
                <Link
                  key={item.label}
                  href={item.route}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                    isActive
                      ? 'bg-bank-gradient text-white shadow'
                      : 'hover:bg-gray-100',
                  )}
                >
                  {Icon ? (
                    <Icon
                      className={cn(
                        'h-5 w-5 flex-shrink-0',
                        isActive && 'text-white',
                      )}
                    />
                  ) : (
                    <div className="relative aspect-square w-5 h-5">
                      <Image
                        src={item.imgURL}
                        alt={item.label}
                        fill
                        className={cn(
                          'object-contain',
                          isActive && 'brightness-[3] invert-0',
                        )}
                      />
                    </div>
                  )}

                  <span
                    className={cn(
                      'whitespace-nowrap',
                      isActive && 'font-medium text-white',
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              )
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </section>
  )
}

export default MobileNav
