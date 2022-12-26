import React from "react"
import classNames from "classnames/bind"
import styles from './Video.module.scss'
import { Link } from "react-router-dom"

const cx = classNames.bind(styles)

const Video = () => {
	return (
		<div className={cx('wrapper')}>
			<div className={cx('video')}>
				<div className={cx('video__thumbnail')}>
					<img
						alt="thumail"
					/>
					<div className={cx('overlay')}></div>
				</div>
				<div className={cx('video__timer')}>
					<span>2:30</span>
				</div>
			</div>
			<div className={cx('artist')}>
				<div className={cx('artist__thumnail')}>
					<img
						src=""
						alt="avatar"
					/>
				</div>
				<div className={cx('artist__info')}>
					<h3 className={cx('video__title')}>Em của ngày hôm nay</h3>
					<div className={cx('artists')}>
						<span>
							<Link>Son Tung</Link>
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Video
