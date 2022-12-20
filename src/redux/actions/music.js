import * as ActionTypes from "../constants"

export const setPlaylist = payload => ({
	type: ActionTypes.SET_PLAYLIST,
	payload
})

export const setCurAlbumId = payload => ({
	type: ActionTypes.SET_CUR_ALBUM_ID,
	payload
})