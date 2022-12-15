import { useState } from "react";

// context
import { useAuthContext } from "../contexts/auth-context/useAuthContext";

// firebase
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../utils/firebase/config'

export const useCreateAccount = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const createAccount = async (email, password, confirmPassword, username, favoriteTeam) => {
        setError(null)
        setIsPending(true)

        if (!favoriteTeam) {
            setError('Please select a favorite team')
        } else if (!username) {
            setError('Please choose a username')
        } else if (!email) {
            setError('Please enter your email')
        } else if (!password) {
            setError('Please enter password')
        } else if (password !== confirmPassword) {
            setError('Passwords do not match')

        } else {
            try {
                const res = await createUserWithEmailAndPassword(auth, email, password)
                console.log(res.user)

                if (!res) {
                    throw new Error('Could not complete signup')
                }

                // add username to user profile
                await updateProfile(auth.currentUser, {
                    displayName: username
                    // add Favorite team photo URL here
                })

                // create user docs
                await setDoc(doc(db, 'users', res.user.uid), {
                    favoriteTeam: favoriteTeam,
                    cardCount: 0
                })

                // dispatch LOG_IN
                dispatch({ type: 'LOG_IN', payload: res.user })
                setError(null)
            }
            catch (err) {
                console.log(`SIGN IN ERROR IS: ${err.message}`)
                switch (err.message) {
                    case 'Firebase: Error (auth/email-already-in-use).':
                        setError("An account already exists with that email.")
                        break
                    case 'Firebase: Error (auth/invalid-email).':
                        setError("An error occurred, please try again later.")
                        break
                    default:
                        setError(err.message)
                }
            }    
        }
        setIsPending(false)
    }
    return { error, isPending, createAccount }
}