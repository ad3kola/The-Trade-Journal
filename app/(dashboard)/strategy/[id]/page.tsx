import CreateStrategy from '@/components/CreateStrategy'
import StrategyAccordion from '@/components/StrategyAccordion'
import React from 'react'

function page() {
  return (
    <main className='w-full flex flex-col gap-4 p-2 sm:p-4'>
      <CreateStrategy />
      <StrategyAccordion />

      
    </main>
  )
}

export default page
