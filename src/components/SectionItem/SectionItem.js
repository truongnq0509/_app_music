import React, { useState } from "react"
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom"
import classNames from "classnames/bind"
import styles from './SectionItem.module.scss'
import { Link } from "react-router-dom"
import { PlayIcon, HeartIcon, DotIcon } from "../Icons"

const cx = classNames.bind(styles)

const SectionItem = ({ data }) => {
	const [isLike, setIsLike] = useState(false)
	const { item, isAlbum, isSong, isAtist } = data
	const navigate = useNavigate()

	return (
		<div className={cx('wrapper')}>
			<div className={cx('image')}>
				<img
					src={item?.thumbnailM}
					alt="avatar"
				/>
				<div
					className={cx('overlay')}
					onClick={() => {
						navigate(item?.link?.split('.')[0])
					}}
				></div>
				<div className={cx('options')}>
					<span
						onClick={() => setIsLike(prev => !prev)}
						className={cx('options__left', {
							'active': isLike
						})}
					>
						<HeartIcon w="1.8rem" h="1.8rem" />
					</span>
					<span className={cx('options__center')}>
						<PlayIcon w="1.8rem" h="1.8rem" />
					</span>
					<span className={cx('options__right')}>
						<DotIcon w="1.8rem" h="1.8rem" />
					</span>
				</div>
			</div>
			<div className={cx('content')}>
				<h4 className={cx('title')}>
					{(isSong || isAtist) && item?.title}
				</h4>
				<div className={cx('box')}>
					{(isAlbum || isSong) && (
						<div className={cx('description')}>
							{item?.sortDescription}
						</div>
					)}

					{isAtist && (
						<div className={cx('artists')}>
							{item?.artists?.filter((item, index) => index < 3)?.map((artist, index) => (
								<Link
									key={artist?.id}
									className={cx('artist')}
								>
									{index === 2 ? `${artist?.name}...` : `${artist?.name}, `}
								</Link>
							))}
						</div>
					)}
					,
				</div>
			</div>
		</div>
	)
}

SectionItem.propTypes = {
	data: PropTypes.object.isRequired,
}

export default SectionItem
