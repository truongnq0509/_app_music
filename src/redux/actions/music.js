import * as ActionTypes from "../constants"

export const setPlaylist = playlist => ({
	type: ActionTypes.SET_PLAYLIST,
	payload: playlist
})

export const setCurAlbumId = id => ({
	type: ActionTypes.SET_CUR_ALBUM_ID,
	payload: id
})