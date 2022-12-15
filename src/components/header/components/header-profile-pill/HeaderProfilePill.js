// context
import { useAuthContext } from '../../../../contexts/auth-context/useAuthContext'
import { useUserContext } from '../../../../contexts/user-context/useUserContext'

// data
import { TEAM_LOGOS } from '../../../../data/team-data'

// styles
import './HeaderProfilePill.scss'

export default function HeaderProfilePill() {
  const { teamIndex } = useUserContext()
  const { user } = useAuthContext()

  return (
    <div className='header-profile-pill-container'>
        <img src={TEAM_LOGOS.current[`${teamIndex}`].logo} alt={TEAM_LOGOS.current[teamIndex].name} />
        <h3>{user.displayName}</h3>
    </div>
  )
}