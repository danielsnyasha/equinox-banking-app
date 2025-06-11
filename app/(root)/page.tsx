import HeaderBox from '@/components/HeaderBox';
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { currentUser } from '@clerk/nextjs/server';

export default async function Home() {
  const user = await currentUser();
  const uiUser = {
    name: user?.fullName ?? 'Guest',
    email: user?.emailAddresses[0]?.emailAddress ?? '',
  };

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={uiUser.name}
            subtext="Access and manage your account and transactions in a proper way"
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
          />
        </header>
        <div>RECENT TRANSACTIONS</div>
      </div>
      <RightSidebar
        user={uiUser}
        transactions={[]}
        banks={[
          { $id: '1', currentBalance: 5678.58 },
          { $id: '2', currentBalance: 34756.76 },
        ]}
      />
    </section>
  );
}
