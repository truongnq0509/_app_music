import React from "react"
import classNames from "classnames/bind"
import styles from './List.module.scss'

const cx = classNames.bind(styles)

const List = () => {
	return (
		<div className={cx('wrapper')}>
			<h2 className={cx('title')}>Day la title</h2>
		</div>
	)
}

export default List
