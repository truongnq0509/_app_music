import { collection, onSnapshot, getDocs, where, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../config/firebase'

export const useTitle = (title) => {
    useEffect(() => {
        const prevTitle = document.title
        document.title = title
        return () => {
            document.title = prevTitle
        }
    })
}

export const useDebounce = (value, delay) => {
    const [debounceValue, setDebounceValue] = useState(value)

    useEffect(() => {
        const hanlder = setTimeout(() => {
            setDebounceValue(value)
        }, delay)

        return () => {
            clearTimeout(hanlder)
        }
    }, [value, delay])

    return debounceValue
}

export const useFirestore = (user, type, collectionName) => {
    const [data, setData] = useState([])

    useEffect(() => {
        if (!user) {
            return
        }

        const ref = collection(db, `users/${user.uid}/${collectionName}`)
        const unsubscribe = onSnapshot(ref, (querySnapshot) => {
            if (!querySnapshot.empty) {
                const dataPromises = querySnapshot.docs.map(async (doc) => {
                    const favoriteData = doc.data()
                    const encodeId = Object.keys(favoriteData)[0]
                    const dataRef = collection(db, `${type}`)
                    const dataSnapshot = await getDocs(query(dataRef, where('encodeId', '==', encodeId)))

                    return dataSnapshot.docs.map((dataDoc) => dataDoc.data())
                })

                Promise.all(dataPromises).then((allData) => {
                    setData(allData.flat())
                })
            } else {
                console.log(`No data found in the ${type} query snapshot.`)
            }
        })

        return () => {
            unsubscribe()
        }
    }, [user, type])

    return data
}
