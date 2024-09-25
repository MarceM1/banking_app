import { getLoggedInUser } from "@/lib/actions/user.actions"
import HeaderBox from "../components/HeaderBox"
import RightSidebar from "../components/RightSidebar"
import TotalBalancebox from "../components/TotalBalancebox"

const Home = async () => {
  const loggedIn = await getLoggedInUser()

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.name || 'Guest'}
            subtext='Access and manage your account and transactions efficiently.'
          />
          <TotalBalancebox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={33785.59}
          />
        </header>
        RECENT TRANSACTONS
      </div>
      <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks={[{currentBalance: 13500.32}, { currentBalance:17638.38}]}
      />
    </section>
  )
}

export default Home