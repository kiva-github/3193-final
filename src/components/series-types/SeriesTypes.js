import { useNavigate, useParams } from 'react-router-dom'

// datas
import { seriesTypes } from '../../data/series-types'

// styles
import './SeriesTypes.scss'
import PanelMedium from '../panel-medium/PanelMedium'
import MainPanelLayout from '../panel-medium/components/MainPanelLayout'

export default function SeriesTypes(type) {
  const { series, category } = useParams()
  const navigate = useNavigate()

  const handleSelection = (path) => {
    navigate(path)
  }

  return (
    <div className='series-card-types-container'>
      {series && !category && seriesTypes[`${series}`]['categories'].map((t) => (
        <div key={t.path} onClick={() => handleSelection(`${t.path}`)}>
          <PanelMedium key={t.path} path={t.path}>
            <MainPanelLayout title={t.title} cardImg={t.coverImg}/>
          </PanelMedium>
        </div>
      ))}
      {series && category && seriesTypes[`${series}`][`${category}`].map((t) => (
        <div key={t.path} onClick={() => handleSelection(`${t.path}`)}>
          <PanelMedium key={t.path} path={t.path}>
            <MainPanelLayout title={t.title} cardImg={t.coverImg}/>
          </PanelMedium>
        </div>
      ))}
    </div>
  )
}