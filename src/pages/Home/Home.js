import React, { useEffect } from "react"
import { apiGetHome } from "../../services/homeService"

const Home = () => {

	useEffect(() => {
		const fetchApi = async () => {
			const data = await apiGetHome()
			console.log(data.data)
		}

		fetchApi()

	}, [])
	return <div>Home</div>
}

export default Home
