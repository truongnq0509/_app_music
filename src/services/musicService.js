import * as httpRequest from '../utils/httpRequest'

export const getTop100 = async () => {
	try {
		const response = await httpRequest.get('/top100')
		return response?.data
	} catch (error) {
		console.log(error)
	}
}

export const getDetailPlaylist = async (id) => {
	try {
		const response = await httpRequest.get('/detailplaylist', {
			params: {
				id
			}
		})
		return response?.data
	} catch (error) {
		console.log(error)
	}
}
