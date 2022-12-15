import { useNavigate } from 'react-router-dom'

// styles
import './SecondaryBtn.scss'

export default function SecondaryBtn({isDisabled=false, title, route=null}) {
  const navigate = useNavigate()

  const handleAction = () => {
    if (route) {
      navigate(route)
    }
  }

  return (
    <div>
      <button
        className='secondary-btn'
        onClick={handleAction}
        disabled={isDisabled}
      >
        <h4>{title}</h4>
      </button>
    </div>
  )
}