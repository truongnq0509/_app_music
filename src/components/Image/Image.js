import React from "react"
import PropTypes from 'prop-types';
import classNames from "classnames/bind"
import styles from './Image.module.scss'

const cx = classNames.bind(styles)

const Image = ({ src = '', alt = '', handleClick = () => { } }) => {
	return (
		<div className={cx('wrapper')} >
			<img
				src={src}
				alt={alt}
			/>
			<div className={cx('overlay')} onClick={handleClick} ></div>
		</div>
	)
}

Image.propTypes = {
	src: PropTypes.string,
	alt: PropTypes.string.isRequired,
	handleClick: PropTypes.func
}

export default Image
