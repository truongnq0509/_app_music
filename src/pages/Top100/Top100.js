import React, { useState, useEffect } from "react"
import classNames from "classnames/bind"
import styles from './Top100.module.scss'
import { useTitle } from '../../hooks'
import { Sections } from "../../components/Sections"
import { getTop100 } from "../../services/musicService"

const cx = classNames.bind(styles)

const Top100 = () => {
	const [data, setData] = useState([])

	// Set title
	useTitle('Top 100 | Tuyển tập nhạc hay chọn lọc')

	useEffect(() => {
		const fetchTop100 = async () => {
			const response = await getTop100()

			if (response?.err === 0) {
				setData(response?.data)
			}
		}
		fetchTop100()
	}, [])

	return (
		<div className={cx('wrapper')}>
			{data && data?.map((item, index) => (
				<Sections key={index} data={item} hasTitleArtist />
			))}
		</div>
	)
}

export default Top100
