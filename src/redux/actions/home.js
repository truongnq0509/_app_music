import * as ActionTypes from "../constants";

export const setHomeData = data => ({
	type: ActionTypes.SET_HOME_DATA,
	payload: data
})

export const setSearch = data => ({
	type: ActionTypes.SET_SEARCH,
	payload: data
})