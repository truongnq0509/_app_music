import {
    doc,
    setDoc,
    collection,
    where,
    getDocs,
    query,
    serverTimestamp,
    deleteDoc,
    onSnapshot,
} from 'firebase/firestore'
import { db } from '../config/firebase'

export const createUserDocument = async (user) => {
    const q = query(collection(db, 'users'), where('uid', '==', user.uid))
    const { docs } = await getDocs(q)

    if (docs.length === 0) {
        const { uid, displayName, email, photoURL, reloadUserInfo } = user

        const docRef = doc(db, `users/${uid}`)
        await setDoc(docRef, {
            uid,
            displayName,
            email,
            photoURL,
            username: reloadUserInfo.displayName,
            createdAt: serverTimestamp(),
        })
    }
}

export const createFavoritesSongs = async (user, song) => {
    const q = query(collection(db, 'users'), where('uid', '==', user.uid))
    const { docs } = await getDocs(q)

    if (docs.length) {
        const userRef = doc(db, `users/${user.uid}`, `favoriteSongs/${song.encodeId}`)
        const songRef = doc(db, `songs/${song.encodeId}`)

        await setDoc(userRef, {
            [song.encodeId]: true,
        })

        await setDoc(songRef, {
            ...song,
            active: true,
        })
    }
}

export const getFavoritesSongs = async (user) => {
    const songs = []
    const favoriteSongsRef = collection(db, `users/${user.uid}/favoriteSongs`)

    onSnapshot(favoriteSongsRef, async (querySnapshot) => {
        if (!querySnapshot.empty) {
            const songPromises = querySnapshot.docs.map(async (doc) => {
                const favoriteSong = doc.data()
                const encodeId = Object.keys(favoriteSong)[0]
                const songsRef = collection(db, `songs`)
                const songSnapshot = await getDocs(query(songsRef, where('encodeId', '==', encodeId)))

                return songSnapshot.docs.map((songDoc) => songDoc.data())
            })

            const allSongs = await Promise.all(songPromises)
            songs.push(...allSongs.flat())
        }
    })

    return songs
}

export const deleteFavoritesSongs = async (user, song) => {
    const q = query(collection(db, 'users'), where('uid', '==', user.uid))
    const { docs } = await getDocs(q)

    if (docs.length) {
        const userRef = doc(db, `users/${user.uid}`, `favoriteSongs/${song.encodeId}`)
        const songRef = doc(db, `songs/${song.encodeId}`)

        await deleteDoc(userRef)
        await deleteDoc(songRef)
    }
}

export const createFavoritesAlbums = async (user, album) => {
    const q = query(collection(db, 'users'), where('uid', '==', user.uid))
    const { docs } = await getDocs(q)

    if (docs.length) {
        const userRef = doc(db, `users/${user.uid}`, `favoriteAlbums/${album.encodeId}`)
        const albumRef = doc(db, `albums/${album.encodeId}`)

        await setDoc(userRef, {
            [album.encodeId]: true,
        })

        await setDoc(albumRef, {
            ...album,
            active: true,
        })
    }
}

export const getFavoritesAlbums = async (user) => {
    const albums = []
    const favoriteAlbumsRef = collection(db, `users/${user.uid}/favoriteAlbums`)
    const querySnapshot = await getDocs(query(favoriteAlbumsRef))

    if (!querySnapshot.empty) {
        const albumPromises = querySnapshot.docs.map(async (doc) => {
            const favoriteAlbum = doc.data()
            const encodeId = Object.keys(favoriteAlbum)[0]
            const albumRef = collection(db, `albums`)
            const albumSnapshot = await getDocs(query(albumRef, where('encodeId', '==', encodeId)))

            return albumSnapshot.docs.map((albumDoc) => albumDoc.data())
        })

        const allAlbums = await Promise.all(albumPromises)
        albums.push(...allAlbums.flat())
    }

    return albums
}

export const deleteFavoritesAlbums = async (user, album) => {
    const q = query(collection(db, 'users'), where('uid', '==', user.uid))
    const { docs } = await getDocs(q)

    if (docs.length) {
        const userRef = doc(db, `users/${user.uid}`, `favoriteAlbums/${album.encodeId}`)
        const albumRef = doc(db, `albums/${album.encodeId}`)

        await deleteDoc(userRef)
        await deleteDoc(albumRef)
    }
}
