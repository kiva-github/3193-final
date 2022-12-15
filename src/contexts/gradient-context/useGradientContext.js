import { useContext } from "react";

// context
import { GradientContext } from './GradientContext'

export const useGradientContext = () => {
    const gradientContext = useContext(GradientContext)

    if (!gradientContext) {
        throw Error('not inside GradientContextProvider')
    }
    return gradientContext
}