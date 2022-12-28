import React, { useState } from "react"
import { useSelector } from "react-redux"
import { useTitle } from "../../hooks"
import { Link } from "react-router-dom"
import classNames from "classnames/bind"
import styles from './Artist.module.scss'
import { Skeleton } from "@mui/material"
import { formatNumber } from "../../utils/fnc"
import { UserIcon, CloseIcon } from "../../components/Icons/Icons"
import { Button } from '../../components/Button'
import { Song, SongSkeleton } from '../../components/Song'
import { Sections } from '../../components/Sections'
import { Image } from '../../components/Image'

const cx = classNames.bind(styles)

const Artist = () => {
	const [isModal, setIsModal] = useState(false)
	const { artist } = useSelector(state => state.artist)
	const { isLoading } = useSelector(state => state.app)

	// Set title
	useTitle(`${artist?.name} - Dev Music Official Account`)

	console.log(isLoading)

	return (
		<div className={cx('wrapper')}>
			<div className={cx('info')}>
				<div className={cx('info-left')}>
					{isLoading ? <Skeleton variant="rectangular" width="100%" height="100%" /> : <Image src={artist?.thumbnailM} alt="thumnail" />}
				</div>
				<div className={cx('info-right')}>
					<h1 className={cx('info-right__name')}>
						{isLoading ? <Skeleton sx={{ fontSize: '5rem', width: "50%" }} /> : <><span>{artist?.realname}</span> ~ <span>{artist?.alias}</span></>}
					</h1>
					<div className={cx('info-right__date')}>
						{artist?.birthday && (
							<span>
								{isLoading ? <Skeleton sx={{ fontSize: '1.8rem', width: '200px' }} /> : `Năm sinh: ${artist?.birthday}`}
							</span>
						)}
					</div>
					<div className={cx('info-right__national')}>
						{artist?.national && (
							<span>
								{isLoading ? <Skeleton sx={{ fontSize: '1.8rem', width: '200px' }} /> : `Năm sinh: ${artist?.national}`}
							</span>
						)}
					</div>
					<div className={cx('info-right__biography')}>
						{isLoading ? (
							<>
								<Skeleton sx={{ fontSize: '1.8rem' }} />
								<Skeleton sx={{ fontSize: '1.8rem' }} />
								<Skeleton sx={{ fontSize: '1.8rem' }} />
								<Skeleton sx={{ fontSize: '1.8rem' }} />
							</>
						) : (
							<>
								<span>

									{artist?.biography ? (artist?.biography?.replace(/<br>/g, '').length > 500 ? `${artist?.biography?.replace(/<br>/g, '').slice(0, 500)} . . . ` : `${artist?.biography?.replace(/<br>/g, '')}`) : (artist?.sortBiography?.replace(/<br>/g, '').length > 160 ? `${artist?.sortBiography?.replace(/<br>/g, '').slice(0, 160)} . . . ` : `${artist?.sortBiography?.replace(/<br>/g, '')}`)}
								</span>
								{artist?.biography?.length > 500 && <span onClick={() => setIsModal(prev => !prev)} className={cx('info-right__more')}> Xem thêm </span>}
							</>
						)}

					</div>
					<div className={cx('info-right__button')}>
						<div className={cx('info-right__follow')}>
							<span>{isLoading ? <Skeleton sx={{ fontSize: '1.8rem', width: '200px' }} /> : `${formatNumber(artist?.totalFollow)} theo dõi`}</span>
						</div>
						{isLoading ? <Skeleton sx={{ fontSize: '1.8rem', width: '100px', height: '50px' }} /> : (
							<Button
								icon={<UserIcon w="1.6rem" h="1.6rem" />}
								title="Follow"
								large
							/>
						)}

					</div>
				</div>
			</div>

			{/* Modal */}
			<div
				className={cx('modal', {
					'active': isModal
				})}
				onClick={() => setIsModal(prev => !prev)}
			>
				<div className={cx('modal__content')}>
					<div className={cx('modal__header')}>
						<div className={cx('modal__avatar')}>
							<Image
								src={artist?.thumbnail}
								alt="avatar"
							/>
						</div>
						<h1 className={cx('modal__title')}>{artist?.alias}</h1>
						<span
							className={cx('modal__close')}
							onClick={e => {
								e.stopPropagation()
								setIsModal(prev => !prev)
							}}
						>
							<CloseIcon
								w="2rem"
								h="2rem"
							/>
						</span>
					</div>
					<div className={cx('modal__body')}>
						<div className={cx('modal__biography')}>
							{`${artist?.biography?.replace(/<br>/g, '')}`}
						</div>
					</div>
				</div>
			</div>

			<div className={cx('section')}>
				{artist?.topAlbum && (
					<div className={cx('section-left')}>
						<div className={cx('section-left__header')}>
							<h3 className={cx('section-left__text')}>
								{isLoading ? <Skeleton sx={{ fontSize: '3.6rem', width: '200px' }} /> : `Bài Hát Nổi Bật`}
							</h3>
						</div>
						<div className={cx('section-left__body')}>
							<div className={cx('section-left__thumbail')}>
								{isLoading ? <Skeleton variant="rectangular" sx={{ bgcolor: 'rgba(51, 55, 59, 0.37)', width: '100%', height: '100%' }} /> : <Image src={artist?.topAlbum?.thumbnailM} alt="thumnail" />}
							</div>
							<div className={cx('section-left__info')}>
								<span className={cx('section-left__type')}>{isLoading ? <Skeleton sx={{ fontSize: '1.8rem', width: '20%', bgcolor: 'rgba(51, 55, 59, 0.37)' }} /> : artist?.topAlbum?.textType}</span>
								<div className={cx('section-left__box')}>
									<h4 className={cx('section-left__title')}>{isLoading ? <Skeleton sx={{ fontSize: '1.8rem', maxWidth: '200px', bgcolor: 'rgba(51, 55, 59, 0.37)' }} /> : artist?.topAlbum?.title}</h4>
									<div className={cx('section-left__artists')}>
										<span>
											{isLoading ? <Skeleton sx={{ fontSize: '1.8rem', maxWidth: '250px', bgcolor: 'rgba(51, 55, 59, 0.37)' }} /> : artist?.topAlbum?.artistsNames}
										</span>
									</div>
									<span className={cx('section-right__date')}>{isLoading ? <Skeleton sx={{ fontSize: '1.8rem', width: '24%', bgcolor: 'rgba(51, 55, 59, 0.37)' }} /> : artist?.topAlbum?.releaseDate}</span>
								</div>
							</div>
						</div>
					</div>
				)}

				<div className={cx('section-right', {
					'full': !(artist?.topAlbum)
				})}>
					<div className={cx('section-right__header')}>
						<h3 className={cx('section-right__text')}>
							{isLoading ? <Skeleton sx={{ fontSize: '3.6rem', width: '200px' }} /> : `Mới Phát Hành`}
						</h3>
						<Link
							to={`/${artist?.link?.split('/')?.[2] ?? artist?.link?.split('/')?.[1]}/bai-hat`}
							className={cx('section-right__all')}
						>
							{isLoading ? <Skeleton sx={{ fontSize: '3.6rem', width: '100px' }} /> : `Tất Cả`}
						</Link>
					</div>
					<div className={cx('section-right__body')}>
						{artist?.sections?.[0]?.items?.filter((item, index) => index < 3)?.map(song => (
							isLoading ? <SongSkeleton key={song.encodeId} /> : <Song key={song.encodeId} song={song} />
						))}
					</div>
				</div>
			</div>

			{artist?.sections?.filter(item => item?.sectionType !== 'song')?.map((section, index) => (
				<Sections
					key={index}
					data={section}
					limit={section?.sectionType === 'video' ? 3 : 6}
					hasTitleSong={section?.sectionType === 'song'}
					hasTitleArtist={(section?.sectionType === 'video' || section?.sectionType === 'playlist')}
					isVideo={section?.sectionType === 'video'}
					isArtist={section?.sectionType === 'artist'}
				/>
			))}
		</div>
	)
}

export default Artist
