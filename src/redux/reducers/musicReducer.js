import * as ActionTypes from '../constants'

const initState = {
	playlist: {},
	curAlbumId: null
}

const musicReducer = (state = initState, action) => {
	switch (action.type) {
		case ActionTypes.SET_PLAYLIST:
			return {
				...state,
				playlist: action.payload || {}
			}
		case ActionTypes.SET_CUR_ALBUM_ID:
			return {
				...state,
				curAlbumId: action.payload || null
			}
		default:
			return state
	}
}

export default musicReducer




