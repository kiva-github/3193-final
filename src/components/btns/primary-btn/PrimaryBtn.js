// styles
import './PrimaryBtn.scss'

export default function PrimaryBtn({ disabled=false, title }) {
  return (
    <div>
      <button disabled={disabled} className='primary-btn dropshadow'>
        <p>{title}</p>
      </button>
    </div>
  )
}