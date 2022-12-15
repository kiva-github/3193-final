import { useContext } from "react";

// context
import { CardsContext } from './CardsContext'

export const useCardsContext = () => {
    const cardsContext = useContext(CardsContext)

    if (!cardsContext) {
        throw Error('not inside CardsContextProvider')
    }
    return cardsContext
}