import React from "react";
import classNames from "classnames/bind";
import styles from './Album.module.scss';

const cx = classNames.bind(styles)

const Album = () => {
	return (
		<div className={cx('wrapper')}>
			Album
		</div>
	);
};

export default Album;
