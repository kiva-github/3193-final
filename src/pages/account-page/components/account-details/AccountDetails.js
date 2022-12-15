import { useEffect, useState } from 'react'

// components
import ActionField from '../../../../components/action-field/ActionField'
import InputBar from '../../../../components/input-bar/InputBar'
import SecondaryBtn from '../../../../components/btns/secondary-btn/SecondaryBtn'
import TeamBar from '../../../../components/team-bar/TeamBar'

// context
import { useAuthContext } from '../../../../contexts/auth-context/useAuthContext'
import { useGradientContext } from '../../../../contexts/gradient-context/useGradientContext'
import { useUserContext } from '../../../../contexts/user-context/useUserContext'

// data
import { TEAM_LOGOS } from '../../../../data/team-data'

// firebase
import { db } from '../../../../utils/firebase/config'
import { getAuth, OAuthProvider, reauthenticateWithPopup, updateEmail, updateProfile } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'

// styles
import './AccountDetails.scss'

export default function AccountDetails() {
  const [isChangingTeam, setIsChangingTeam] = useState(false)
  const [savedDisplayName, setSavedDisplayName] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [savedEmail, setSavedEmail] = useState('')
  const [email, setEmail] = useState('')
  const { user } = useAuthContext()
  const { teamIndex } = useUserContext()
  const { dispatch, previewedGradients, previewedGradientsId, selectedGradients} = useGradientContext()
  const loginAuth = getAuth()
  const signInProvider = new OAuthProvider()

  function reAuth() {
    try {
      console.log('reauthorizing...')
      reauthenticateWithPopup(loginAuth, signInProvider)
        .then((res) => {
          const userRes = res.user
          const credential = OAuthProvider.credentialFromResult(res);
          console.log(userRes, credential)
        })
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    setSavedDisplayName(user.displayName)
    setDisplayName(user.displayName)
    setSavedEmail(user.email)
    setEmail(user.email)
  }, [user])

  const handleTeamChange = () => {
    if (isChangingTeam) {
      setIsChangingTeam(false)
      if (previewedGradients) {
        if (previewedGradients !== selectedGradients) {
          if (previewedGradientsId) {
            updateTeam(previewedGradientsId)
          }
        }
      }
    } else {
      setIsChangingTeam(true)
    }
  }

  const updateDisplayName = (newDisplayName) => {
    if (newDisplayName === savedDisplayName) {
      alert('Same display name was entered')
    } else {
      try {
        updateProfile(user, {
          displayName: newDisplayName
        })
        alert('Username updated!')
      } catch (err) {
        alert(err.message)
      }
    }
  }

  const updateUserEmail = (newEmailStr) => {
    console.log(user)
    if (newEmailStr === savedEmail) {
      alert('Same email was entered')
    } else {
      updateEmail(user, newEmailStr).then(() => {
        alert('Email updated!')
      }).catch(e => reAuth())
    }
  }

  const updateTeam = async (previewedGradientsId) => {
    const teamRef = doc(db, "users", user.uid)
    try {
      await updateDoc(teamRef, {
        favoriteTeam: previewedGradientsId
      })
      dispatch({ type: 'SET_BG', payload: previewedGradients})
      dispatch({ type: 'PREVIEW_BG', payload: [null, null]})
      alert('Team updated!')
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className='acc-details-container'>
      {teamIndex &&
        <ActionField>
          <TeamBar selectedTeamId={teamIndex} val={TEAM_LOGOS.current[teamIndex].name} img={TEAM_LOGOS.current[teamIndex].logo} expanded={isChangingTeam}/>
          <div onClick={handleTeamChange}>
            <SecondaryBtn title={isChangingTeam ? 'DONE' : 'CHANGE TEAM'} />
          </div>
        </ActionField>
      }
      {!isChangingTeam &&
        <>
          <ActionField>
            <InputBar type={'text'} value={!displayName ? savedDisplayName : displayName} updateValue={!displayName ? setSavedDisplayName : setDisplayName} />
            <div onClick={() => updateDisplayName(displayName)}>
              <SecondaryBtn title='CHANGE USERNAME' isDisabled={displayName === savedDisplayName} />
            </div>    
          </ActionField>
          <ActionField>
            <InputBar type={'text'} value={!email ? savedEmail : email} updateValue={!email? setSavedEmail : setEmail} />
            <div onClick={() => updateUserEmail(email)}>
              <SecondaryBtn title='CHANGE EMAIL' isDisabled={email === savedEmail} />
            </div>
          </ActionField>      
        </>
      }
    </div>
  )
}