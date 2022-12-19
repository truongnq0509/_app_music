import axios from "axios";

const httpRequest = axios.create({
	baseURL: process.env.REACT_APP_API_MP3
})

export const get = async (path, options = {}) => {
	const response = await httpRequest.get(path, options)
	return response
}

export default httpRequest