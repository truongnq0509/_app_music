import * as ActionTypes from "../constants";
import { apiGetHome } from "../../services/homeService";

export const getHomeData = () => async dispatch => {
	try {
		const response = await apiGetHome()
		if (response?.err === 0) {
			dispatch({
				type: ActionTypes.GET_HOME_DATA,
				payload: response?.data?.items
			})
		}
	} catch (error) {
		dispatch({
			type: ActionTypes.GET_HOME_DATA,
			payload: null
		})
	}
}

export const setIsLoading = flag => ({
	type: ActionTypes.SET_IS_LOADING,
	payload: flag
})