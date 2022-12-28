import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment/moment";
import classNames from "classnames/bind";
import styles from './Album.module.scss';
import { Skeleton } from "@mui/material";
import 'react-loading-skeleton/dist/skeleton.css'
import { getDetailPlaylist } from '../../services/musicService'
import { setPlaylist, setCurAlbumId, setIsLoading } from '../../redux/actions'
import { formatNumber } from "../../utils/fnc";
import { Song, SongSkeleton } from "../../components/Song";
import { Image } from "../../components/Image";
import Button from "../../components/Button/Button";
import { useTitle } from "../../hooks";
import { PlayAllIcon, MusicAddIcon, HeartIcon } from '../../components/Icons'


const cx = classNames.bind(styles)

const Album = () => {
	const { id } = useParams()
	const dispatch = useDispatch()
	const { playlist } = useSelector(state => state.music)
	const { isLoading } = useSelector(state => state.app)
	const [isLike, setIsLike] = useState(false)

	// Set title
	useTitle(`${playlist?.title} | Album 320 lossless`)

	// Get playlist
	useEffect(() => {
		const fetchDetailPlaylist = async () => {
			dispatch(setCurAlbumId(id))
			dispatch(setIsLoading(true))
			const response = await getDetailPlaylist(id)
			if (response?.err === 0) {
				dispatch(setPlaylist(response?.data))
				dispatch(setIsLoading(false))
			}
		}

		fetchDetailPlaylist()

		// Set scroll
		window.scrollTo(0, 0)
	}, [id])

	return (
		<div className={cx('wrapper')}>
			<div className={cx('info')}>
				<div className={cx('info-left')}>
					{isLoading ? (
						<Skeleton variant="rectangular" width="100%" height="100%" />
					) : (
						<Image
							src={playlist?.thumbnailM}
							alt="thumnail"
						/>
					)}
				</div>
				<div className={cx('info-right')}>
					<h1 className={cx('info-right__title')}>
						{isLoading ? <Skeleton sx={{ fontSize: '3.9rem' }} width="50%" /> : playlist?.title}
					</h1>
					<div className={cx('info-right__date')}>
						<span>
							{isLoading ? <Skeleton sx={{ fontSize: '1.8rem' }} width={300} /> : `Cập nhật: ${moment.unix(playlist?.contentLastUpdate).format('DD/MM/YYYY')}`}
						</span>
					</div>
					<div className={cx('info-right__artist')}>
						{isLoading ? <Skeleton width={400} sx={{ fontSize: '1.8rem' }} /> : playlist?.artists?.map((artist, index) => (
							<span
								key={artist?.id}
							>
								<Link
									key={artist?.id}
									to={`/${artist?.link?.split('/')?.[2] ?? artist?.link?.split('/')?.[1]}`}
								>
									{artist?.name}
								</Link>
								{index === playlist?.artists?.length - 1 ? '' : ','}
								<span style={{ width: '6px', display: 'block' }}></span>
							</span>
						))}
					</div>
					<div className={cx('info-right__like')}>
						{isLoading ? <Skeleton sx={{ fontSize: '1.8rem' }} /> : (
							<span>
								<span className={cx('active')}>{formatNumber(playlist?.like)}</span> người yêu thích
							</span>
						)}
					</div>
					<p className={cx('info-right__desc')}>
						{isLoading ? <Skeleton sx={{ fontSize: '1.8rem' }} /> : playlist?.description}
					</p>
					<div className={cx('info-right__total')}>
						{isLoading ? <Skeleton sx={{ fontSize: '1.8rem' }} width={200} /> : (
							<span>
								<span className={cx('active')}>{playlist?.song?.total}</span> songs ~ <span className={cx('active')}>{moment.utc(playlist?.song?.totalDuration * 1000).format('H') === '0' ? moment.utc(playlist?.song?.totalDuration * 1000).format('mm:ss') : moment.utc(playlist?.song?.totalDuration * 1000).format('H')}</span>
								{moment.utc(playlist?.song?.totalDuration * 1000).format('H') === '0' ? ' mute+' : ' hrs+'}
							</span>
						)}
					</div>
					<div className={cx('info-right__button')}>
						{isLoading ? <Skeleton variant="rounded" width="100px" height="40px" /> :
							(
								<Button
									icon={<PlayAllIcon w="1.8rem" h="1.8rem" />}
									title="Tất cả"
									small
								/>
							)
						}

						{isLoading ? <Skeleton variant="rounded" width="100px" height="40px" /> :
							(
								<Button
									icon={<MusicAddIcon w="1.8rem" h="1.8rem" />}
									title="Thêm vào thư viện"
									small
								/>
							)
						}

						{isLoading ? <Skeleton variant="rounded" width="100px" height="40px" /> :
							(
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
									large
									handleClick={() => setIsLike(prev => !prev)}
								/>
							)
						}
					</div>
				</div>
			</div>

			{/* Playlist */}
			<div className={cx('playlist')}>
				{playlist?.song?.items?.map(song => (
					isLoading ? <SongSkeleton key={song.encodeId} /> : <Song key={song.encodeId} song={song} />
				))}
			</div>

		</div >
	);
};

export default Album;
