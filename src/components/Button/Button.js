import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from './Button.module.scss'

const cx = classNames.bind(styles)

const Button = ({ icon, title = '', small = false, medium = false, large = false, handleClick, className }) => {
    return (
        <button
            className={cx('button', {
                'button--small': small,
                'button--medium': medium,
                'button--large': large,
                [className]: className,
            })}
            onClick={handleClick}
        >
            {icon && <span className={cx('button__icon')}>{icon}</span>}
            {title && <span className={cx('button__title')}>{title}</span>}
        </button>
    )
}

Button.propTypes = {
    icon: PropTypes.node,
    title: PropTypes.string,
    small: PropTypes.bool,
    medium: PropTypes.bool,
    large: PropTypes.bool,
    className: PropTypes.string,
    handleClick: PropTypes.func,
}

export default Button
