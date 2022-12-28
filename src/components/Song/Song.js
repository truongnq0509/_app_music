import React, { useState, memo } from "react"
import PropTypes from 'prop-types';
import { Link } from "react-router-dom"
import moment from "moment"
import classNames from "classnames/bind"
import styles from "./Song.module.scss"
import { HeartIcon, DotIcon } from "../Icons"
import { Image } from "../Image"

const cx = classNames.bind(styles)

const Song = ({ song }) => {
	const [isLike, setIsLike] = useState(false)

	return (
		<div className={cx('song')}>
			<div className={cx('song__left')}>
				<div className={cx('song__image')}>
					<Image src={song?.thumbnail} alt="thumbnail" />
				</div>
				<span
					className={cx('song__heart', {
						'active': isLike
					})}
					onClick={() => setIsLike(prev => !prev)}
				>
					<HeartIcon w="1.8rem" h="1.8rem" />
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
							<Link
								to={`/${artist?.link?.split('/')?.[2] ?? artist?.link?.split('/')?.[1]}`}
							>
								{artist?.name}
							</Link>
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

Song.propTypes = {
	song: PropTypes.object.isRequired,
}

export default memo(Song)
