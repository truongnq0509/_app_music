import * as httpRequest from '../utils/httpRequest'


export const apiGetHome = async () => {
	try {
		const response = await httpRequest.get('/home')
		return response
	} catch (error) {
		console.log(error)
	}
}