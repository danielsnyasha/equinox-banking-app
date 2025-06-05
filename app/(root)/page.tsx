import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import React from 'react'

const Home = () => {
    const loggedIn = {firstName: "Nyasha", lastName:"Musanhu", email:"nyashamusanhu@email.com"}
    return (
        <section className='home'>
            <div className='home-content'>
                <header className='home-header'>
                    <HeaderBox
                    type="greeting"
                    title="Welcome"
                    user={loggedIn?.firstName || 'Guest'}
                    subtext="Access and manage your account and transactions in a proper way"
                    />
                    <TotalBalanceBox accounts={[]}
                    totalBanks={1}
                    totalCurrentBalance={1250.35}/>
                  
                </header>
                RECENT TRANSACTIONS
            </div>
            <RightSidebar user={loggedIn} transactions={[]} banks={[{currentBalance: 5678.58}, {currentBalance: 34756.76}]}/>
        </section>
    )
}

export default Home