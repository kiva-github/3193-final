import { useNavigate } from 'react-router-dom'

// styles
import './TertiaryBtn.scss'

export default function TertiaryBtn({title, route=-1, disabled=false}) {
  const navigate = useNavigate()

  const handleNavigate = (r) => {
    if (r === -1) {
      navigate(r)
    } else if (!r) {
      return
    } else {
      navigate(r)
    }
  }

  return (
    <div>
      <button className='tertiary-btn' onClick={() => handleNavigate(route)} disabled={disabled}>
        <h5>{title}</h5>
      </button>
    </div>
  )
}