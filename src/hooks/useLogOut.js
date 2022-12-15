import { useState } from 'react'

// firebase
import { signOut } from 'firebase/auth'
import { auth } from '../utils/firebase/config'

// context
import { useAuthContext } from '../contexts/auth-context/useAuthContext'

export const useLogOut = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const logOut = async () => {
        setError(null)
        setIsPending(true)
        
        try {
            await signOut(auth)
            dispatch({ type: 'LOG_OUT', payload: null})
            setError(null)
            setIsPending(false)
        } catch (err) {
            console.log(err.message)
            setError(err.message)
            setIsPending(false)
        }
    }
    return { error, isPending, logOut }
}