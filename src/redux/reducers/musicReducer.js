import * as ActionTypes from '../constants'

const initState = {
    playlist: {},
    curAlbumId: null,
    curSongId: null,
    curSong: {},
    playing: false,
    volume: {
        currentVolume: 32,
        beforeVolume: 0,
    },
}

const musicReducer = (state = initState, action) => {
    switch (action.type) {
        case ActionTypes.SET_PLAYLIST:
            return {
                ...state,
                playlist: action.payload || {},
            }
        case ActionTypes.SET_CUR_ALBUM_ID:
            return {
                ...state,
                curAlbumId: action.payload || null,
            }
        case ActionTypes.SET_CUR_SONG_ID:
            return {
                ...state,
                curSongId: action.payload || null,
            }
        case ActionTypes.SET_CUR_SONG:
            return {
                ...state,
                curSong: action.payload || {},
            }
        case ActionTypes.SET_PLAYING:
            return {
                ...state,
                playing: action.payload || false,
            }
        case ActionTypes.SET_VOLUME:
            return {
                ...state,
                volume: action.payload,
            }
        default:
            return state
    }
}

export default musicReducer
