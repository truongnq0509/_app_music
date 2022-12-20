import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames/bind";
import moment from "moment/moment";

import styles from './Album.module.scss';
import { useParams } from "react-router";
import { getDetailPlaylist } from '../../services/musicService'
import { setPlaylist, setCurAlbumId } from '../../redux/actions'
import { formatNumber } from "../../utils/fnc";
import Button from "../../components/Button/Button";
import { PlayAllIcon, MusicAddIcon, HeartIcon } from '../../components/Icons'


const cx = classNames.bind(styles)

const Album = () => {
	const { id } = useParams()
	const dispatch = useDispatch()
	const { playlist } = useSelector(state => state.music)
	const [playlistData, setPlaylistData] = useState([])
	const [isLike, setIsLike] = useState(false)


	useEffect(() => {
		const fetchDetailPlaylist = async () => {
			dispatch(setCurAlbumId(id))
			const response = await getDetailPlaylist(id)
			if (response?.err === 0) {
				setPlaylistData(response?.data)
				dispatch(setPlaylist(response?.data))
			}
		}

		fetchDetailPlaylist()
	}, [id])

	console.log(playlist)


	return (
		<div className={cx('wrapper')}>
			<div className={cx('info')}>
				<div className={cx('info-left')}>
					<img
						src={playlistData?.thumbnailM}
						alt="thumnail"
						className={cx('info-left__thumbnail')}
					/>
					<div className={cx('overlay')}></div>
				</div>
				<div className={cx('info-right')}>
					<h1 className={cx('info-right__title')}>
						{playlistData?.title}
					</h1>
					<div className={cx('info-right__date')}>
						<span>
							{`Cập nhật: ${moment.unix(playlistData?.contentLastUpdate).format('DD/MM/YYYY')}`}
						</span>
					</div>
					<div className={cx('info-right__artist')}>
						<span>
							{playlistData?.artists?.map((artist, index) => (
								<span
									key={artist?.id}
								>
									<Link
										key={artist?.id}
									>
										{artist?.name}
									</Link>
									{index === playlistData?.artists?.length - 1 ? ' ' : ', '}
								</span>
							))}
						</span>

					</div>
					<div className={cx('info-right__like')}>
						<span>
							<span className={cx('active')}>{formatNumber(playlistData?.like)}</span> người yêu thích
						</span>
					</div>
					<p className={cx('info-right__desc')}>
						{playlistData?.description}
					</p>
					<div className={cx('info-right__total')}>
						<span>
							<span className={cx('active')}>{playlistData?.song?.total}</span> songs ~ <span className={cx('active')}>{moment.utc(playlistData?.song?.totalDuration * 1000).format('H')}</span> hrs+
						</span>
					</div>
					<div className={cx('info-right__button')}>
						<Button
							icon={<PlayAllIcon w="1.8rem" h="1.8rem" />}
							title="Tất cả"
						/>

						<Button
							icon={<MusicAddIcon w="1.8rem" h="1.8rem" />}
							title="Thêm vào thư viện"
						/>

						<Button
							icon={
								<HeartIcon
									w="1.8rem"
									h="1.8rem"
									className={cx('heart', {
										'active': isLike
									})}
								/>
							}
							title="Like"
							handleClick={() => setIsLike(prev => !prev)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Album;
