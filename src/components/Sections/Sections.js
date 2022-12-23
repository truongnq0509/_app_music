import React from "react"
import PropTypes from 'prop-types';
import classNames from "classnames/bind"
import styles from './Sections.module.scss'
import SectionItem from "../SectionItem/SectionItem"
import { Link } from "react-router-dom";

const cx = classNames.bind(styles)

const Sections = ({ data, isAlbum = false, isSong = false, isAtist = false }) => {
	console.log(data)
	return (
		<div className={cx('wrapper')}>
			<div className={cx('header')}>
				<h3 className={cx('title')}>
					{data?.title}
				</h3>
				{data?.link && (
					<Link
						className={cx('all')}
					>
						Tất Cả
					</Link>
				)}
			</div>
			<div className={cx('sections')}>
				{data && data?.items?.filter((item, index) => index < 6)?.map((item, index) => (
					<SectionItem
						key={index}
						data={{
							item,
							isAlbum,
							isSong,
							isAtist
						}}
					/>
				))}
			</div>
		</div>
	)
}

Sections.propTypes = {
	data: PropTypes.object,
	isAlbum: PropTypes.bool,
	isSong: PropTypes.bool,
	isAtist: PropTypes.bool,
}

export default Sections
