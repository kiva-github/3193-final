import { useState } from 'react'

// components
import AccountDetails from './components/account-details/AccountDetails'
import ChangePassword from './components/change-password/ChangePassword'
import Header from '../../components/header/Header'

// styles
import './AccountPage.scss'

export default function AccountPage() {
  const [active, setActive] = useState('details')
  const [accToggle, setAccToggle] = useState('details')

  const handleClick = (t) => {
    setAccToggle(t)
    setActive(t)
  }

  return (
    <div className='account-page-wrap'>
        <Header btnNav={-1} navPath={'ACCOUNT'} acctStats={true} acctTab={true}/>
        <div className='acc-toggle'>
          <h3 className={active === 'details' ? 'underline' : ''} onClick={() => handleClick('details')}>ACCOUNT DETAILS</h3>
          <h3 className={active === 'password' ? 'underline' : ''} onClick={() => handleClick('password')}>CHANGE PASSWORD</h3>
        </div>
        {accToggle === 'details' ? <AccountDetails /> : <ChangePassword />}
    </div>
  )
}