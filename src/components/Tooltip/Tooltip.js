import React from "react"
import PropTypes from 'prop-types';
import classNames from "classnames/bind"
import { Link } from "react-router-dom";
import styles from './Tooltip.module.scss'
import Button from "../Button/Button"
import { UserIcon } from "../Icons"
import { formatNumber } from "../../utils/fnc";

const cx = classNames.bind(styles)

const Tooltip = ({ attrs, data: artist }) => {

	return (
		<div className={cx('wrapper')} {...attrs}>
			<div className={cx('artist')}>
				<div className={cx('artist__left')}>
					<div className={cx('artist__avatar')}>
						<img
							src={artist?.thumbnail}
							alt="avatar"
							to={`/${artist?.link?.split('/')?.[2] ?? artist?.link?.split('/')?.[1]}`}
						/>
					</div>
					<div className={cx('artist__info')}>
						<Link to={`/${artist?.link?.split('/')?.[2] ?? artist?.link?.split('/')?.[1]}`}>
							<span className={cx('artist__name')}>
								{artist?.name}
							</span>
						</Link >
						<span className={cx('artist__follow')}>
							{`${formatNumber(artist?.totalFollow)} theo dõi`}
						</span>
					</div>
				</div>
				<div className={cx('artist__right')}>
					<Button
						icon={<UserIcon w="1.6rem" h="1.6rem" />}
						title="Follow"
						small
					/>
				</div>
			</div>
			<div className={cx('album')}>
				<h2 className={cx('album__title')}>Mới Nhất</h2>
				<div className={cx('album__list')}>
					{artist?.sections?.[1]?.items?.filter((item, index) => index < 4)?.map(song => (
						<div
							key={song?.encodeId}
							className={cx('album__item')}
						>
							<div className={cx('album__img')}>
								{/* <Link to={`${song?.link?.split('.')?.[0]}`}> */}
								<img
									src={song?.thumbnail}
									alt="avatar"
								/>
								{/* </Link> */}
							</div>
							<h3 className={cx('album__name')}>{song?.title}</h3>
							<span className={cx('album__date')}>{song?.releaseDate?.split('/')[2]}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

Tooltip.propTypes = {
	attrs: PropTypes.object.isRequired,
	data: PropTypes.object.isRequired
}

export default Tooltip
