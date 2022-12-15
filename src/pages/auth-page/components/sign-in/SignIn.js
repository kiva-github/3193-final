import { useState } from 'react'

// components
import InputBar from '../../../../components/input-bar/InputBar'
import InputsContainer from '../../../../components/inputs-container/InputsContainer'
import PrimaryBtn from '../../../../components/btns/primary-btn/PrimaryBtn'

// hooks
import { useSignIn } from '../../../../hooks/useSignIn'

// styles
import './SignIn.scss'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { error, isPending, signIn } = useSignIn()

  const handleLogin = () => {
    signIn(email, password)
  }

  return (
    <div className='sign-in-wrap'>
      <InputsContainer>
          <InputBar type='email' pH='EMAIL' value={email} updateValue={setEmail}/>
          <InputBar type='password' pH='PASSWORD' value={password} updateValue={setPassword}/>
          {isPending &&
            <div onClick={handleLogin}>
              <PrimaryBtn title='LOGGING IN...' disabled={true}/>
            </div>
          }
          {!isPending && 
            <div onClick={handleLogin}>
              <PrimaryBtn title='LOG IN'/>
            </div>
          }
      </InputsContainer>
      {error && <p className='error'>{error}</p>}
    </div>
  )
}