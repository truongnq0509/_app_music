import * as httpRequest from '../utils/httpRequest'

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