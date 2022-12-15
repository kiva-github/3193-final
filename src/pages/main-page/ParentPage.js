import { Outlet } from 'react-router-dom'

// context
import { useGradientContext } from '../../contexts/gradient-context/useGradientContext'

// styles
import './ParentPage.scss'

export default function ParentPage() {
  const { selectedGradients } = useGradientContext()
  return (
    <>
      {selectedGradients &&
        <div
          className='parent-page-wrap'
          style={
            {
                background: `radial-gradient(circle, 
                    rgba(${selectedGradients['0']}) 25%,
                    rgba(${selectedGradients['1']}) 100%)`
            }
          }
        >
            <Outlet />
        </div>
      }
    </>
  )
}
