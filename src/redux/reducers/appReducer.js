const initState = {
	banner: ['truong', 'nguyen', 'quang']
}

const appReducer = (state = initState, action) => {
	switch (action.type) {
		case '':
			return {
				...state,

			}
		default:
			return state
	}
}

export default appReducer