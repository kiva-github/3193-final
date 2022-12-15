// styles
import './HeaderDataPill.scss'

export default function HeaderDataPill({ val, img }) {
  return (
    <div className='header-data-pill-wrap'>
        <h5>{val}</h5>
        <img src={img} alt='' />
    </div>
  )
}
