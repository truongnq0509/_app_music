import * as ActionTypes from '../constants'

const initState = {
	artist: {},
	isTooltip: false,
}

const artistReducer = (state = initState, action) => {
	switch (action.type) {
		case ActionTypes.SET_ARTIST:
			return {
				...state,
				artist: action.payload || {}
			}
		default:
			return state
	}
}

export default artistReducer




