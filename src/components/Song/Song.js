import React, { useState, useEffect, memo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import moment from "moment"
import Tippy from '@tippyjs/react/headless'
import classNames from "classnames/bind"
import styles from "./Song.module.scss"
import { HeartIcon, DotIcon } from "../Icons"
import { useDebounce } from "../../hooks"
import { Tooltip } from "../Tooltip"
import { Image } from "../Image"
import { getArtist } from "../../services/artistService"
import { setIsTooltip, setArtist } from "../../redux/actions"

const cx = classNames.bind(styles)

const Song = ({ song }) => {
	const dispatch = useDispatch()
	const [isLike, setIsLike] = useState(false)
	const [alias, setAlias] = useState('')
	const { artist, isTooltip } = useSelector(state => state.artist)

	const debounceValue = useDebounce(alias, 500)

	useEffect(() => {
		const fetchArtist = async () => {
			dispatch(setIsTooltip(false))
			const response = await getArtist(debounceValue)
			if (response?.err === 0) {
				dispatch(setArtist(response?.data))
				dispatch(setIsTooltip(true))
			}
		}

		if (debounceValue) {
			fetchArtist()
		}
	}, [debounceValue])

	const resultInfoArtist = attrs => (isTooltip && <Tooltip attrs={attrs} data={artist} />)

	return (
		<div className={cx('song')}>
			<div className={cx('song__left')}>
				<div className={cx('song__image')}>
					<Image
						src={song?.thumbnail}
						alt="thumbnail"
					/>
				</div>
				<span
					className={cx('song__heart', {
						'active': isLike
					})}
					onClick={() => setIsLike(prev => !prev)}
				>
					<HeartIcon
						w="1.8rem"
						h="1.8rem"
					/>
				</span>
			</div>
			<div className={cx('song__center')}>
				<div className={cx('song__title')}>
					<span>{`${song?.title} ~ `}</span>
					{song?.artists?.map((artist, index) => (
						<span
							key={artist?.id}
							className={cx('song__artist')}
						>
							<Tippy
								interactive
								delay={[0, 400]}
								offset={[0, 5]}
								placement="bottom-start"
								render={resultInfoArtist}
							>
								<Link
									onMouseOver={() => {
										dispatch(setIsTooltip(false))
										setAlias(artist?.alias)
									}}
									to={`/${artist?.link?.split('/')?.[2] ?? artist?.link?.split('/')?.[1]}`}
								>
									{artist?.name}
								</Link>
							</Tippy>
							{index === song?.artists?.length - 1 ? ' ' : ', '}
						</span>
					))}
				</div>
				<div className={cx('song__album')}>
					<span>{song?.album?.title}</span>
				</div>
			</div>
			<div className={cx('song__right')}>
				<div className={cx('song__time')}>
					<span>{moment.utc(song?.duration * 1000).format('m:ss')}</span>
				</div>

				<div className={cx('song__options')}>
					<span>
						<DotIcon w="1.6rem" h="1.6rem" />
					</span>
				</div>
			</div>
		</div >
	)
}

export default memo(Song)
