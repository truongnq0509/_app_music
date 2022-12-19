import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import classNames from "classnames/bind"
import styles from './Home.module.scss'
import { Banner } from "../../components/Banner"
import { apiGetHome } from "../../services/homeService"
import * as actions from '../../redux/actions/home'
import { Sections } from "../../components/Sections"

const cx = classNames.bind(styles)

const Home = () => {
	const dispatch = useDispatch()
	const { banner, hArtistTheme, hAutoTheme1, hAutoTheme2, top100, hXone, hAlbum } = useSelector(state => state.app)

	useEffect(() => {
		const fetchDataHome = async () => {
			const response = await apiGetHome()

			console.log(response)

			if (response?.err === 0) {
				dispatch(actions.getHomeData(response?.data?.items))
			}
		}
		fetchDataHome()

	}, [])

	return (
		<div className={cx('wrapper')}>
			<Banner banner={banner} />
			<Sections data={hArtistTheme} isAlbum />
			<Sections data={top100} isAtist />
			<Sections data={hAlbum} isSong />
			<Sections data={hAutoTheme1} isSong />
			<Sections data={hAutoTheme2} isAtist />
			<Sections data={hXone} isSong />

		</div>
	)
}

export default Home
