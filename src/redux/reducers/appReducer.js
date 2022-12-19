import * as ActionTypes from '../constants'

const initState = {
	banner: [],
	hArtistTheme: {},
	hAutoTheme1: {},
	hAutoTheme2: {},
	top100: {},
	hXone: {},
	hAlbum: {}
}

const appReducer = (state = initState, action) => {
	switch (action.type) {
		case ActionTypes.GET_HOME_DATA:
			return {
				...state,
				banner: action.payload.find(item => item.sectionId === 'hSlider')?.items || [],
				hArtistTheme: action.payload.find(item => item.sectionId === 'hArtistTheme') || {},
				hAutoTheme1: action.payload.find(item => item.sectionId === 'hAutoTheme1') || {},
				hAutoTheme2: action.payload.find(item => item.sectionId === 'hAutoTheme2') || {},
				top100: action.payload.find(item => item.sectionId === 'h100') || {},
				hXone: action.payload.find(item => item.sectionId === 'hXone') || {},
				hAlbum: { ...action.payload.find(item => item.sectionId === 'hAlbum'), title: 'Album' } || {},
			}
		default:
			return state
	}
}

export default appReducer