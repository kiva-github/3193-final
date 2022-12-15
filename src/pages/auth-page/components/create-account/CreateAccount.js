import { useEffect, useState } from 'react'

// components
import ErrorPopup from '../../../../components/error-popup/ErrorPopup'
import InputBar from '../../../../components/input-bar/InputBar'
import InputsContainer from '../../../../components/inputs-container/InputsContainer'
import PrimaryBtn from '../../../../components/btns/primary-btn/PrimaryBtn'

// context
import { useGradientContext } from '../../../../contexts/gradient-context/useGradientContext'

// data
import { GRADIENT_DATA } from '../../../../data/gradient-data'

// hooks
import { useCreateAccount } from '../../../../hooks/useCreateAccount'

// styles
import './CreateAccount.scss'

export default function CreateAccount() {
  const [favoriteTeam, setFavoriteTeam] = useState()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { error, isPending, createAccount } = useCreateAccount()
  const { dispatch, generatedGradients, selectedGradients } = useGradientContext()

  const handleChange = (e) => {
    setFavoriteTeam(e.target.value)
    dispatch({ type: 'SET_BG', payload: GRADIENT_DATA[e.target.value]})
  }

  const handleClick = () => {
    createAccount(email, password, confirmPassword, username, favoriteTeam)
      .then(() => {
        setFavoriteTeam()
        setUsername('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
      })
  }

  useEffect(() => {
    if (error === 'Passwords do not match') {
      setPassword('')
      setConfirmPassword('')
    }
  }, [error])

  return (
    <>
    <div className='sign-up-container'>
      <InputsContainer>
          <select
            className='favorite-team-select'
            name='teams'
            id='teams'
            onChange={handleChange}
            style={{ backgroundColor: `rgb(${!selectedGradients ? generatedGradients['1'] : selectedGradients['1']})`}}
          >
            <option value='' defaultValue>SELECT YOUR FAVORITE TEAM</option>
            <option value='' disabled>---AL WEST---</option>
              <option value='ANA'>Angels®</option>
              <option value='HOU'>Houston Astros®</option>
              <option value='OAK'>Oakland Athletics™</option>
              <option value='SEA'>Seattle Mariners™</option>
              <option value='TEX'>Texas Rangers®</option>
            <option value='' disabled>---AL CENTRAL---</option>
              <option value='CLE'>Cleveland Guardians™</option>
              <option value='KC'>Kansas City Royals®</option>
              <option value='DET'>Detroit Tigers®</option>
              <option value='MIN'>Minnesota Twins®</option>
              <option value='CWS'>Chicago White Sox®</option>
            <option value='' disabled>---AL EAST---</option>
              <option value='TOR'>Toronto Blue Jays®</option>
              <option value='BAL'>Baltimore Orioles®</option>
              <option value='TB'>Tampa Bay Rays™</option>
              <option value='BOS'>Boston Red Sox®</option>
              <option value='NYY'>New York Yankees®</option>
            <option value='' disabled>---NL WEST---</option>
               <option value='ARI'>Arizona Diamondbacks®</option>
              <option value='lAD'>Los Angeles Dodgers®</option>
              <option value='SF'>San Francisco Giants®</option>
              <option value='SD'>San Diego Padres™</option>
              <option value='COL'>Colorado Rockies™</option>
            <option value='' disabled>---NL CENTRAL---</option>
              <option value='MIL'>Milwaukee Brewers™</option>
              <option value='STL'>St. Louis Cardinals®</option>
              <option value='CHC'>Chicago Cubs®</option>
              <option value='PIT'>Pittsburgh Pirates®</option>
              <option value='CIN'>Cincinnati Reds®</option>
            <option value='' disabled>---NL EAST---</option>
              <option value='ATL'>Atlanta Braves™</option>
              <option value='FLA'>Miami Marlins®</option>
              <option value='NYM'>New York Mets®</option>
              <option value='WSH'>Washington Nationals®</option>
              <option value='PHI'>Philadelphia Phillies®</option>
          </select>
          <InputBar type='text' pH='USERNAME' value={username} updateValue={setUsername}/>
          <InputBar type='email' pH='EMAIL' value={email} updateValue={setEmail}/>
          <InputBar type='password' pH='PASSWORD' value={password} updateValue={setPassword}/>
          <InputBar type='password' pH='CONFIRM PASSWORD' value={confirmPassword} updateValue={setConfirmPassword}/>
          <div onClick={handleClick}>
            {!isPending && <PrimaryBtn title='SIGN UP'/>}
            {isPending && <PrimaryBtn title='LOADING...'/>}
          </div>
      </InputsContainer>
      <h6 className='agreement'><i>By continuing you agree to the</i> <b>CardVault Terms of Service</b><i>, and acknowledge you’ve read our </i><b>Privacy Policy</b>.</h6>
    </div> 
    {error && <ErrorPopup message={error} />}
    </>
  )
}