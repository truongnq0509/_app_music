import React, { useEffect } from "react"
import classNames from "classnames/bind"
import styles from './Home.module.scss'
import { apiGetHome } from "../../services/homeService"

import { Banner } from "../../components/Banner"

const cx = classNames.bind(styles)

const Home = () => {

	useEffect(() => {
		const fetchDataHome = async () => {
			const response = await apiGetHome()
			console.log(response.items)
		}
		fetchDataHome()

	}, [])
	return (
		<div className={cx('wrapper')}>
			<Banner />

		</div>
	)
}

export default Home
