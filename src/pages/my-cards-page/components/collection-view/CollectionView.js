import { useNavigate, useParams } from 'react-router-dom'

// components
import Card from '../../../../components/card/Card'

// context
import { useCardsContext } from '../../../../contexts/cards-context/useCardsContext'

// hooks
import { useCollection } from '../../../../hooks/useCollection'

// styles
import './CollectionView.scss'

export default function CollectionView() {
  const { cardData } = useCardsContext()
  const navigate = useNavigate()
  const { series, category, type } = useParams()
  const { documents } = useCollection(series, category, type)

  return (
    <div className='collection-view-container'>
      {documents && cardData && cardData.map((card) => (
          <div key={card.cardNumber} className={documents[`${card.cardNumber}`] !== undefined ? 'card-container collected' : 'card-container'}>
              <div className='card-preview-container' onClick={() => navigate(`${card.cardNumber}`)}>
                  <Card playerName={card.name}/>
              </div>
              <div className='card-details-container'>

                <div className='card-number panel-bg'>
                    <h5>{card.cardNumber}</h5>
                </div>
                
                <div className='card-number panel-bg'>
                    <h5>{documents[`${card.cardNumber}`] !== undefined ? `x${documents[`${card.cardNumber}`][`${card.cardNumber}`].quantityCollected}` : 'x0'}</h5>
                </div>
              </div>
          </div>
      ))}
    </div>
  )
}
