import React, { memo } from "react"
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import classNames from "classnames/bind"
import styles from './Sections.module.scss'
import { Skeleton } from "@mui/material";
import { SectionItem, SectionItemSkeleton } from "../SectionItem"

const cx = classNames.bind(styles)

const Sections = ({ data, limit = data?.items?.length, hasTitleAlbum = false, hasTitleSong = false, hasTitleArtist = false, isVideo = false, isArtist = false }) => {
	const { type } = useParams()
	const { isLoading } = useSelector(state => state.app)

	return (
		<div className={cx('wrapper')}>
			<div className={cx('header')}>
				{!type && <h3 className={cx('title')}> {isLoading ? <Skeleton sx={{ fontSize: '3.6rem', width: "160px" }} /> : data?.title}</h3>}

				{data?.link && !type && (
					<Link
						to={data?.link?.split('/')?.[data?.link?.split('/')?.length - 1]}
						className={cx('all')}
					>
						{isLoading ? <Skeleton sx={{ fontSize: '3.6rem', width: "100px" }} /> : 'Tất Cả'}
					</Link>
				)}
			</div>
			<div className={cx('section-playlist')}>
				{data && data?.items?.filter((item, index) => index < limit)?.map((item, index) => (
					<div
						key={index}
						className={cx('section-playlist__item', {
							'item-3': isVideo
						})}
					>
						{isLoading ? (
							<SectionItemSkeleton
								data={{
									item,
									isArtist,
									isVideo
								}}
							/>
						) : <SectionItem
							data={{
								item,
								hasTitleAlbum,
								hasTitleSong,
								hasTitleArtist,
								isVideo,
								isArtist
							}}
						/>
						}
					</div>
				))}
			</div>
			<div className={cx('section-artist')}>

			</div>
		</div>
	)
}

Sections.propTypes = {
	data: PropTypes.object,
	limit: PropTypes.number,
	hasTitleAlbum: PropTypes.bool,
	hasTitleSong: PropTypes.bool,
	hasTitleArtist: PropTypes.bool,
	isVideo: PropTypes.bool,
	isArtist: PropTypes.bool,
}

export default memo(Sections)
