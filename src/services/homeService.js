import * as httpRequest from '../utils/httpRequest'

export const home = async () => {
	try {
		const response = await httpRequest.get('/home')
		return response?.data
	} catch (error) {
		console.log(error)
	}
}