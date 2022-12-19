import React, { useState } from "react"
import classNames from "classnames/bind"
import styles from './ItemSection.module.scss'
import { Link } from "react-router-dom"
import { PlayIcon, HeartIcon, DotIcon } from "../Icons"

const cx = classNames.bind(styles)

const ItemSection = ({ data }) => {
	const [isLike, setIsLike] = useState(false)
	const { item, isAlbum, isSong, isAtist } = data

	return (
		<div className={cx('wrapper')}>
			<div className={cx('image')}>
				<img
					src={item?.thumbnailM}
					alt="avatar"
				/>
				<div className={cx('overlay')}></div>
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

export default ItemSection
