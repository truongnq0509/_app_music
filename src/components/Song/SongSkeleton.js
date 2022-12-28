import React, { useState, memo } from "react"
import classNames from "classnames/bind"
import styles from "./Song.module.scss"
import { Skeleton } from "@mui/material";

const cx = classNames.bind(styles)
const color = 'rgba(51, 55, 59, 0.37)'

const Song = () => {
	return (
		<div className={cx('song')}>
			<div className={cx('song__left')}>
				<div className={cx('song__image')}>
					<Skeleton variant="rectangular" sx={{ width: '100%', height: '100%', bgcolor: color }} />
				</div>
				<span className={cx('song__heart')} >
					<Skeleton variant="rounded" sx={{ width: '20px', height: '20px', bgcolor: color }} />
				</span>
			</div>
			<div className={cx('song__center')}>
				<div className={cx('song__title')}>
					<Skeleton sx={{ fontSize: '1.6rem', bgcolor: color }} />
				</div>
				<div className={cx('song__album')}>
					<Skeleton sx={{ fontSize: '1.6rem', bgcolor: color }} />
				</div>
			</div>
			<div className={cx('song__right')}>
				<div className={cx('song__time')}>
					<span>
						<Skeleton sx={{ fontSize: '1.6rem', bgcolor: color }} width={26} />
					</span>
				</div>

				<div className={cx('song__options')}>
					<span>
						<Skeleton sx={{ fontSize: '1.6rem', bgcolor: color }} />
					</span>
				</div>
			</div>
		</div>
	)
}

export default memo(Song)
