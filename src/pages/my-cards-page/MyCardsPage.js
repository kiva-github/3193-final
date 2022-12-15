import { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'

// components
import Header from '../../components/header/Header'

// context
import { useCardsContext } from '../../contexts/cards-context/useCardsContext'

// data
import { S1_22_base } from '../../data/cards-data/2022/S1_22/S1_22_base'
import { S2_22_base } from '../../data/cards-data/2022/S2_22/S2_22_base'
import { US_22_base } from '../../data/cards-data/2022/US_22/US_22_base'
import { US_22_generation_now } from '../../data/cards-data/2022/US_22/US_22_generation_now'
import { US_22_paragons_of_the_postseason } from '../../data/cards-data/2022/US_22/US_22_paragons_of_the_postseason'
import { US_22_topps_black_gold } from '../../data/cards-data/2022/US_22/US_22_topps_black_gold'
import { US_22_2022_all_star_game } from '../../data/cards-data/2022/US_22/US_22_2022_all_star_game'

// styles
import './MyCardsPage.scss'

const cardDataDict = {
    's1-2022': {
      'base-set': {
        'base': S1_22_base,
      }
    },
    's2-2022': {
      'base-set': {
        'base': S2_22_base,
      }
    },
    'us-2022': {
      'base-set': {
        'base': US_22_base,
      },
      'insert': {
        'generation-now': US_22_generation_now,
        'paragons-of-the-postseason': US_22_paragons_of_the_postseason,
        'topps-black-gold': US_22_topps_black_gold,
        '2022-all-star-game': US_22_2022_all_star_game
      }
    },
}

export default function MyCardsPage() {
    const { series, category, type, cardNum } = useParams()
    const [headerPath, setHeaderPath] = useState('MY CARDS')
    const [headerRoute, setHeaderRoute] = useState('/')
    const [headerPathConcat, setHeaderPathConcat] = useState('')
    const { dispatch } = useCardsContext()

    useEffect(() => {
        setHeaderPath('MY CARDS')
        let currPath = ''
        let currRoute = '/'
        let imgPath = 'my-cards/'
        if (series) {
          currPath += ` / ${series.toUpperCase()}`
          imgPath += `/${series}`
          if (category) {
            currPath += ` / ${category.toUpperCase()}`
            imgPath += `/${category}`
            if (type) {
              currPath += ` / ${type.toUpperCase()}`
              imgPath += `/${type}`
              dispatch({ type: 'UPDATE_CARD_DATA', payload: cardDataDict[`${series}`][`${category}`][`${type}`]})
              dispatch({ type: 'FETCH_CARD_IMGS', payload: imgPath })
              currRoute = `/my-cards/${series}/${category}`
              if (cardNum) {
                currPath += ` / ${cardNum.toUpperCase()}`
                currRoute = `/my-cards/${series}/${category}/${type}`
              }
            } else {
              dispatch({ type: 'UPDATE_CARD_DATA', payload: cardDataDict[`${series}`][`${category}`]})
              currRoute = `/my-cards/${series}`
            }
          } else {
            dispatch({ type: 'UPDATE_CARD_DATA', payload: cardDataDict[`${series}`]})
            currRoute = '/my-cards'
          }
        }
        setHeaderRoute(currRoute)
        setHeaderPathConcat(currPath)
      }, [dispatch, series, category, type, cardNum])

    return (
        <div className='my-cards-wrap'>
            <Header btnNav={headerRoute} navPath={`${headerPath} ${headerPathConcat}`} acctStats={true} />
            <Outlet /> 
        </div>
    )
}