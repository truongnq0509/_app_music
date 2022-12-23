import React from "react"
import PropTypes from 'prop-types';
import classNames from "classnames/bind"
import styles from './Sections.module.scss'
import { SectionItem } from "../SectionItem"

const cx = classNames.bind(styles)

const Sections = ({ data, isAlbum = false, isSong = false, isAtist = false }) => {

	return (
		<div className={cx('wrapper')}>
			<h3 className={cx('title')}>
				{data?.title}
			</h3>
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
