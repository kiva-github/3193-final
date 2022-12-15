// assets
import cardIcon from '../../../assets/system/card-icon.png'

// styles
import './MainPanelLayout.scss'

export default function MainPanelLayout({title, cardCount = 0, coverImg, cardImg}) {
  return (
    <div className='main-panel-layout-wrap'>
        <div className='label'>         
          <h2>{title.toUpperCase()}</h2>
          <div className='card-count-container'>
              <img src={cardIcon} alt='' />
              <h5>{cardCount}</h5>
          </div>
        </div>
        {coverImg &&
          <div className='cover-image-container'>
            <img src={coverImg} alt="" />
          </div>
        }
        {cardImg &&
          <div className='card-image-container'>
            <img src={cardImg} alt="" />
          </div>
        }
    </div>  
  )
}
