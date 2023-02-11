import * as ActionTypes from '../constants'

export const setPlaylist = (playlist) => ({
    type: ActionTypes.SET_PLAYLIST,
    payload: playlist,
})

export const setCurAlbumId = (id) => ({
    type: ActionTypes.SET_CUR_ALBUM_ID,
    payload: id,
})

export const setCurSongId = (id) => ({
    type: ActionTypes.SET_CUR_SONG_ID,
    payload: id,
})

export const setCurSong = (song) => ({
    type: ActionTypes.SET_CUR_SONG,
    payload: song,
})

export const setPlaying = (flag) => ({
    type: ActionTypes.SET_PLAYING,
    payload: flag,
})

export const setVolume = (cur, before) => ({
    type: ActionTypes.SET_VOLUME,
    payload: {
        currentVolume: cur,
        beforeVolume: before,
    },
})
