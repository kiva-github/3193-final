import { useState } from 'react'

// context
import { useAuthContext } from '../../contexts/auth-context/useAuthContext'

// firebase
import { initializeApp } from "firebase/app"
import { getAuth } from 'firebase/auth'
// import { getAnalytics } from 'firebase/analytics'
import {
  doc,
  getDoc,
  getFirestore,
  increment,
  setDoc,
  updateDoc
} from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCsA6mPYWudr4ff9BLYz52YfTj13K0S7vs",
  authDomain: "pull-vault.firebaseapp.com",
  projectId: "pull-vault",
  storageBucket: "pull-vault.appspot.com",
  messagingSenderId: "486497881333",
  appId: "1:486497881333:web:05304745cdb18aba8a09bc",
  measurementId: "G-T1TCDY6GBJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
// const analytics = getAnalytics(app);
export const storage = getStorage(app)
// const storageRef = ref(storage)


// accesssing Firestore
export const useFirestore = () => {
  const [favoriteTeam, setFavoriteTeam] = useState(null)
  const [cardCount, setCardCount] = useState(null)
  const [error, setError] = useState(null)
  const { user } = useAuthContext()

  const getUserDocs = async () => {
      setError(null)

      try {
          const docRef = doc(db, 'users', user.uid)
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
              setFavoriteTeam(docSnap.data().favoriteTeam)
              setCardCount(docSnap.data().cardCount)
              setError(null)
            } else {
              setError('Document does not exist')
            }
      } catch (err) {
          setError(err.message)
      }
  }

  const addCard = async (series, category, type, cardData, quantity) => {
      console.log('inside addCard')
      setError(null)


      const ref = doc(db, 'users', `${user.uid}`, 'my-cards', `${series}`, `${category}`, `${type}`, 'cards', `${cardData.cardNumber}`)
      const docSnap = await getDoc(ref)

      if (docSnap.exists()) {
          try {
              await updateDoc(ref, {
                  quantityCollected: increment(quantity)
              })
              updateCardCount(quantity)
              setError(null)
          } catch (err) {
              setError(err.message)
              alert(err.message)
          }
      } else {
          console.log('doc doesnt exist, creating now...')
          try {
              await setDoc(ref, {
                  cardAttributes: cardData.cardAttributes,
                  cardNumber: cardData.cardNumber,
                  cardType: cardData.cardType,
                  name: cardData.name,
                  team: cardData.team,
                  quantityCollected: quantity
              })
              updateCardCount(quantity)
              setError(null)
          } catch (err) {
              setError(err.message)
              alert(err.message)
          }
      }
  }

  const updateCardCount = async (quantity) => {
      setError(null)
      const countRef = doc(db, 'users', `${user.uid}`)
      const docSnap = await getDoc(countRef)
      if (docSnap.exists()) {
          try {
              await updateDoc(countRef, {
                  cardCount: increment(quantity)
              })
              setError(null)
          } catch (err) {
              setError(err.message)
          }
      } else {
          setError("can't find doc")
      }
  }

  return { cardCount, error, favoriteTeam, getUserDocs, addCard }
}