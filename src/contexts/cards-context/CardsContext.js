import { createContext, useReducer } from "react";

export const CardsContext = createContext()

export const cardsReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_CARD_DATA':
            return { ...state, cardData: action.payload }
        case 'UPDATE_FETCHED_CARD_DATA':
            return { ...state, fetchedCardData: action.payload }
        case 'FETCH_CARD_IMGS':
            return { ...state, fetchedCardImgs: action.payload }
        default:
            return state
    }
}

export const CardsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cardsReducer, {
        cardData: null,
        fetchedCardData: null,
        fetchedCardImgs: null
    })
    console.log('CardsContext state:', state)


    return (
        <CardsContext.Provider value={{ ...state, dispatch }}>
            { children }
        </CardsContext.Provider>
    )
}