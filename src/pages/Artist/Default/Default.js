import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Outlet } from "react-router"
import { useParams } from "react-router"
import { getArtist } from "../../../services/artistService"
import { setArtist, setIsLoading } from "../../../redux/actions"

const Default = () => {
	const { name } = useParams()
	const dispatch = useDispatch()

	useEffect(() => {
		const fetchArtist = async () => {
			dispatch(setIsLoading(true))
			const response = await getArtist(name)
			if (response?.err === 0) {
				dispatch(setArtist(response?.data))
				dispatch(setIsLoading(false))
			}
		}
		fetchArtist()

		// Set scroll
		window.scrollTo(0, 0)
	}, [name])


	return <Outlet />
}

export default Default
