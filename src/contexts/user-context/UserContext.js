import { createContext, useEffect, useReducer } from "react";

// firebase
import { useFirestore } from "../../utils/firebase/config";

export const UserContext = createContext()

export const userReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_TEAM':
            return { ...state, teamIndex: action.payload }
        case 'UPDATE_CARD_COUNT':
            return { ...state, cardCount: action.payload }
        default:
            return state
    }
}

export const UserContextProvider = ({ children }) => {
    const { cardCount, favoriteTeam, getUserDocs } = useFirestore()
    const [state, dispatch] = useReducer(userReducer, {
        teamIndex: null,
        cardCount: null
    })

    useEffect(() => {
        getUserDocs()
    }, [getUserDocs])

    useEffect(() => {
        dispatch({ type: 'UPDATE_TEAM', payload: favoriteTeam})
        dispatch({ type: 'UPDATE_CARD_COUNT', payload: cardCount})
    }, [cardCount, favoriteTeam])
    // console.log('UserContext state:', state)

    return (
        <UserContext.Provider value={{ ...state, dispatch }}>
            { children }
        </UserContext.Provider>
    )
}