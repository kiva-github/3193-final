import { useNavigate } from 'react-router-dom'

// assets
import addIcon from '../../assets/system/add-icon.png'

// components
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import PanelMedium from '../../components/panel-medium/PanelMedium'
import MainPanelLayout from '../../components/panel-medium/components/MainPanelLayout'

// context
import { useUserContext } from '../../contexts/user-context/useUserContext'

// styles
import './HomePage.scss'

export default function HomePage() {
  const navigate = useNavigate()
  const { cardCount } = useUserContext()

  return (
    <div className='home-page-wrap'>
        <Header acctStats={true} acctTab={true} />
        <div className='panels-container'>
          <div className='panel-row-container'>
            <div className='panel-row'>
              <div onClick={() => navigate('/add')}>
                <PanelMedium>
                  <div className='add-card-panel'>
                    <h3>Add a card</h3>
                    <img className='add-icon' src={addIcon} alt='' />
                  </div>
                </PanelMedium>
              </div>
            </div>
          </div>
          <div className='panel-row-container'>
            <div className='panel-row-header'>
              <h2>MY CARDS</h2>
            </div>
            <div className='panel-row'>
              <div style={{ opacity: '0.25'}}>
                <PanelMedium >
                  <MainPanelLayout title={'2023'}/>
                </PanelMedium>
              </div>
              <div onClick={() => navigate('/my-cards')}>
                <PanelMedium>
                  <MainPanelLayout title={'2022'} cardCount={cardCount}/>
                </PanelMedium>
              </div>
              <div style={{ opacity: '0.25'}}>
                <PanelMedium>
                  <MainPanelLayout title={'2021'} />            
                </PanelMedium>
              </div>
            </div>
          </div>
        </div>
        <Footer />
    </div>
  )
}