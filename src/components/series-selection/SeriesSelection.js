// components
import MainPanelLayout from '../panel-medium/components/MainPanelLayout'
import PanelMedium from '../panel-medium/PanelMedium'

// context
// import { useCardsContext } from '../../contexts/cards-context/useCardsContext'

// data
import { SERIES_DATA } from '../../data/series-data'

// styles
import './SeriesSelection.scss'

export default function SeriesSelection(page) {
  return (
    <div className='year-container'>
      <h2>2022</h2>
      <div className='series-container'>
        {SERIES_DATA && SERIES_DATA.map((pack) => (
            <PanelMedium key={pack.path} path={pack.path}>
              <MainPanelLayout title={pack.title}/>
            </PanelMedium>
        ))}
      </div>
    </div>
  )
}