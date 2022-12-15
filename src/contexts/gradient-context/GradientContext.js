import { createContext, useEffect, useReducer } from "react";
import { GRADIENT_DATA } from "../../data/gradient-data";

import { useUserContext } from '../user-context/useUserContext'

export const GradientContext = createContext()

export const userReducer = (state, action) => {
    switch (action.type) {
        case 'GENERATE_BG':
            return { ...state, generatedGradients: action.payload }
        case 'SET_BG':
            return { ...state, selectedGradients: action.payload }
        case 'PREVIEW_BG':
            return { ...state, previewedGradients: action.payload[0], previewedGradientsId: action.payload[1]}
        default:
            return state
    }
}

export const GradientContextProvider = ({ children }) => {
    const { teamIndex } = useUserContext()

    const [state, dispatch] = useReducer(userReducer, {
        generatedGradients: null,
        selectedGradients: null,
        previewedGradients: null,
        previewedGradientsId: null
    })
    console.log('GradientContext state:', state)

    useEffect(() => {
        if (teamIndex) {
            // console.log(GRADIENT_DATA[teamIndex])
            dispatch({ type: 'SET_BG', payload: GRADIENT_DATA[teamIndex] })
        }
    }, [teamIndex])

    return (
        <GradientContext.Provider value={{ ...state, dispatch }}>
            { children }
        </GradientContext.Provider>
    )
}