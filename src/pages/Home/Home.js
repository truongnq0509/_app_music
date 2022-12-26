import React from "react"
import { useSelector } from "react-redux"
import classNames from "classnames/bind"
import styles from './Home.module.scss'
import { Banner } from "../../components/Banner"
import { Sections } from "../../components/Sections"

const cx = classNames.bind(styles)

const Home = () => {
	const { banner, hArtistTheme, hAutoTheme1, hAutoTheme2, top100, hXone, hAlbum } = useSelector(state => state.app)

	return (
		<div className={cx('wrapper')}>
			<Banner banner={banner} />
			<Sections data={hArtistTheme} hasTitleArtist limit={6} />
			<Sections data={top100} hasTitleArtist limit={6} />
			<Sections data={hAlbum} hasTitleSong limit={6} />
			<Sections data={hAutoTheme1} hasTitleSong />
			<Sections data={hAutoTheme2} hasTitleArtist />
			<Sections data={hXone} hasTitleSong />
		</div>
	)
}

export default Home
