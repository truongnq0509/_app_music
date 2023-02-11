import React from "react"
import PropTypes from 'prop-types';
import classNames from "classnames/bind"
import styles from './SectionItem.module.scss'
import { Skeleton } from "@mui/material";

const cx = classNames.bind(styles)

const SectionItemSkeleton = ({ data }) => {
	const { isArtist, isVideo } = data
	return (
		<div className={cx('wrapper')}>
			<div className={cx('image', {
				'full': isArtist
			})}>
				<Skeleton variant="rectangular" sx={{ paddingBottom: isVideo ? '50%' : '100%', width: '100%', height: '0' }} />
			</div>
			<div className={cx('content')}>
				<h4 className={cx('title')}>
					<Skeleton sx={{ fontSize: '1.6rem' }} />
				</h4>
				<div className={cx('box')}>
					<Skeleton sx={{ fontSize: '1.6rem', width: '60%' }} />
				</div>
				{isArtist && (
					<div className={cx('artist')}>
						<div className={cx('artist__button')}>
							<Skeleton variant="rectangular" sx={{ width: '50%', height: '40px' }} />
						</div>
					</div>
				)}
			</div>
		</div >
	)

}


SectionItemSkeleton.propTypes = {
	data: PropTypes.object,
}


export default SectionItemSkeleton

