'use client'

import React from 'react'
import CountUp from 'react-countup'

interface AnimatedCounterProps {
  value: number
  duration?: number
  decimals?: number
  separator?: string
  prefix?:string
}

const AnimatedCounter = ({
  value,
  duration = 3,
  decimals = 2,
  separator = ',',
  prefix='$'
}: AnimatedCounterProps) => {
  return (
    <>
      $<CountUp end={value} duration={duration} separator={separator} decimals={decimals} />
    </>
  )
}

export default AnimatedCounter
