import { useEffect, useState} from 'react'

// firebase
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../utils/firebase/config'

// hooks
import { useAuthContext } from '../contexts/auth-context/useAuthContext'

export const useCollection = (series, category, type) => {
    const [documents, setDocuments] = useState(null)
    const { user } = useAuthContext()

    useEffect(() => {
        // console.log('useCollection.js: useEffect() ran')

        let colRef = collection(db, 'users', `${user.uid}`, 'my-cards', `${series}`, `${category}`, `${type}`, 'cards')
        const unsub = onSnapshot(colRef, (snapshot) => {
            let res = {}
            snapshot.docs.forEach((doc) => {
                const obj = {}
                obj[doc.id] = doc.data()
                res[doc.id] = obj
            })
            console.log('Res')
            console.log(res)
            setDocuments(res)
        })

        return () => unsub()

    }, [user.uid, series, category, type])

    return { documents }
}