import { useEffect, useState } from 'react'

// styles
import './ErrorPopup.scss'

export default function ErrorPopup({ message }) {
  const [isDisplayed, setIsDisplayed] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsDisplayed(false);
    }, 3000)
  }, [])

  return isDisplayed ?
    <div className='error-popup-container dropshadow panel-bg' style={{ display: `${isDisplayed}`}}>
      <h3>{message}</h3>
    </div>
    :
    null
}