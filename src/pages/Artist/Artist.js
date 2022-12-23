import React, { useState, useEffect } from "react"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import classNames from "classnames/bind"
import styles from './Artist.module.scss'
import Tippy from "@tippyjs/react/headless"
import { formatNumber } from "../../utils/fnc"
import { getArtist } from '../../services/artistService'
import { UserIcon, CloseIcon } from "../../components/Icons/Icons"
import { Button } from '../../components/Button'
import { useTitle } from '../../hooks'

const cx = classNames.bind(styles)

const Artist = () => {
	const { name } = useParams()
	const [isModal, setIsModal] = useState(false)
	const [artist, setArtist] = useState({})

	// Set title
	useTitle(`${artist?.alias} - Dev Music Official Account`)

	useEffect(() => {
		const fetchArtist = async () => {
			const response = await getArtist(name)
			if (response?.err === 0) {
				setArtist(response?.data)
			}
		}
		fetchArtist()
	}, [])

	// console.log(artist)

	return (
		<div className={cx('wrapper')}>
			<div className={cx('info')}>
				<div className={cx('info-left')}>
					<div className={cx('info-left__thumbnail')}>
						<img
							src={artist?.thumbnailM}
							alt="thumnail"
							className={cx('info-left__thumbnail')}
						/>
						<div className={cx('overlay')}></div>
					</div>
				</div>
				<div className={cx('info-right')}>
					<h1 className={cx('info-right__name')}>
						<span>{artist?.realname}</span> ~ <span>{artist?.alias}</span>
					</h1>
					<div className={cx('info-right__date')}>
						{artist?.birthday && (
							<span>
								Năm sinh: {artist?.birthday}
							</span>
						)}
					</div>
					<div className={cx('info-right__national')}>
						{artist?.national && (
							<span>
								Quốc tịch: {artist?.national}
							</span>
						)}
					</div>
					<div className={cx('info-right__biography')}>
						<span>
							{artist?.biography ? (artist?.biography?.replace(/<br>/g, '').length > 500 ? `${artist?.biography?.replace(/<br>/g, '').slice(0, 500)} . . . ` : `${artist?.biography?.replace(/<br>/g, '')}`) : (artist?.sortBiography?.replace(/<br>/g, '').length > 160 ? `${artist?.sortBiography?.replace(/<br>/g, '').slice(0, 160)} . . . ` : `${artist?.sortBiography?.replace(/<br>/g, '')}`)}
						</span>

						{artist?.biography?.length > 500 && <span onClick={() => setIsModal(prev => !prev)} className={cx('info-right__more')}> Xem thêm </span>}
					</div>
					<div className={cx('info-right__button')}>
						<div className={cx('info-right__follow')}>
							<span>{`${formatNumber(artist?.totalFollow)} theo dõi`}</span>
						</div>
						<Button
							icon={<UserIcon w="1.6rem" h="1.6rem" />}
							title="Follow"
							large
						/>
					</div>
				</div>
			</div>

			<div
				className={cx('modal', {
					'active': isModal
				})}
				onClick={() => setIsModal(prev => !prev)}
			>
				<div className={cx('modal__content')}>
					<div className={cx('modal__header')}>
						<img
							src={artist?.thumbnail}
							alt="avatar"
							className={cx('modal__avatar')}
						/>
						<h1 className={cx('modal__title')}>{artist?.alias}</h1>
						<span
							className={cx('modal__close')}
							onClick={e => {
								e.stopPropagation()
								setIsModal(prev => !prev)
							}}
						>
							<CloseIcon
								w="2rem"
								h="2rem"
							/>
						</span>
					</div>
					<div className={cx('modal__body')}>
						<div className={cx('modal__biography')}>
							{`${artist?.biography?.replace(/<br>/g, '')}`}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Artist
