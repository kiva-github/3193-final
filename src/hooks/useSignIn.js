import { useState } from 'react'

// context
import { useAuthContext } from '../contexts/auth-context/useAuthContext'

// firebase
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../utils/firebase/config'

export const useSignIn = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const signIn = async (email, password) => {
        setError(null)
        setIsPending(true)

        try {
            const res = await signInWithEmailAndPassword(auth, email, password)
            dispatch({ type: 'LOG_IN', payload: res.user})
            setError(null)
            setIsPending(false)

        } catch (err) {
            setError(err.message)
            setIsPending(false)
        }
    }
    return { error, isPending, signIn }
}