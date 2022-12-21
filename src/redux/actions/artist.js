import * as ActionTypes from "../constants"

export const setAlias = alias => ({
	type: ActionTypes.SET_ALIAS,
	payload: alias
})

export const setArtist = artist => ({
	type: ActionTypes.SET_ARTIST,
	payload: artist
})

export const setIsTooltip = flag => ({
	type: ActionTypes.SET_IS_TOOLTIP,
	payload: flag
})

