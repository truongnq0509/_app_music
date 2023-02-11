import * as httpRequest from '../utils/httpRequest'

export const search = async (keyword) => {
	try {
		const response = await httpRequest.get('/search', {
			params: {
				keyword
			}
		})
		return response?.data
	} catch (error) {
		console.log(error)
	}
}