import React from "react"
import classNames from "classnames/bind"
import styles from "./Song.module.scss"

const cx = classNames.bind(styles)

const Song = () => {
	return (
		<div className={cx('song')}>
			<div className={cx('song__image')}>
				<img
					src="https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/a/6/5/5/a65573e6905dc4f29f59c49ea04866cf.jpg"
					alt="thumbnail"
				/>
			</div>
			<div>

			</div>
		</div>
	)
}

export default Song
