import React from "react";
import classNames from "classnames/bind";
import styles from './Player.module.scss';

const cx = classNames.bind(styles)

const Player = () => {
	return <div className={cx('wrapper')}>
		<div className={cx('info')}>
			Info
		</div>
		<div className={cx('player')}>
			Playing
		</div>
		<div className={cx('volume')}>
			Volume
		</div>
	</div>;
};

export default Player;
