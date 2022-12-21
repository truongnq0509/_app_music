import React, { useState, useEffect, memo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import moment from "moment"
import classNames from "classnames/bind"
import styles from "./Song.module.scss"
import Tippy from '@tippyjs/react/headless'
import { Tooltip } from "../Tooltip"
import { HeartIcon, DotIcon } from "../Icons"
import { setAlias } from "../../redux/actions"

const cx = classNames.bind(styles)

const Song = ({ song }) => {
	const dispatch = useDispatch()
	const { artist, isTooltip } = useSelector(state => state.artist)
	const [isLike, setIsLike] = useState(false)

	const resultInfoArtist = attrs => (isTooltip && <Tooltip attrs={attrs} data={artist} />)

	return (
		<div className={cx('song')}>
			<div className={cx('song__left')}>
				<div className={cx('song__image')}>
					<img
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
			<div className={cx('song__right')}>
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
									onMouseOver={() => dispatch(setAlias(artist?.alias))}
									to={artist?.link}
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
				<div className={cx('song__time')}>
					<span>{moment.utc(song?.duration * 1000).format('mm:ss')}</span>
				</div>
			</div>
			<div className={cx('song__options')}>
				<span>
					<DotIcon w="1.6rem" h="1.6rem" />
				</span>
			</div>
		</div >
	)
}

export default memo(Song)
