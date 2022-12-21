import * as httpRequest from '../utils/httpRequest'

export const getArtist = async (alias) => {
	try {
		const response = await httpRequest.get('/artist', {
			params: {
				name: alias
			}
		})

		return response?.data
	} catch (error) {
		console.log(error)
	}
}