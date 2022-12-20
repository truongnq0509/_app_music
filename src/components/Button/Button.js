import React from "react"
import PropTypes from 'prop-types';
import classNames from "classnames/bind"
import styles from './Button.module.scss'

const cx = classNames.bind(styles)

const Button = ({ icon, title = '', handleClick }) => {
	return (
		<button
			className={cx('button')}
			onClick={handleClick}
		>
			<span className={cx('button__icon')}>{icon}</span>
			{title && <span className={cx('button__title')}>{title}</span>}
		</button>
	)
}

Button.propTypes = {
	icon: PropTypes.node,
	title: PropTypes.string,
	handleClick: PropTypes.func
}

export default Button
