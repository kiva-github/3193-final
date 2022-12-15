// styles
import './AttributePill.scss'

export default function AttributePill({ borderCol = '#FFFFFF', label }) {
  return (
    <div className='attribute-pill-container panel-bg' style={{ border: `2px solid ${borderCol}`}}>
        <h5>{ label }</h5>
    </div>
  )
}