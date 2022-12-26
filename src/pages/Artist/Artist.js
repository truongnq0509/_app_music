import React, { useState, useEffect } from "react"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { useTitle } from '../../hooks'
import classNames from "classnames/bind"
import styles from './Artist.module.scss'
import { formatNumber } from "../../utils/fnc"
import { getArtist } from '../../services/artistService'
import { UserIcon, CloseIcon } from "../../components/Icons/Icons"
import { Button } from '../../components/Button'
import { Song } from '../../components/Song'
import { Sections } from '../../components/Sections'
import { Image } from '../../components/Image'


const cx = classNames.bind(styles)

const Artist = () => {
	const { name } = useParams()
	const [isModal, setIsModal] = useState(false)
	const [artist, setArtist] = useState({})

	// Set title
	useTitle(`${artist?.alias} - Dev Music Official Account`)

	useEffect(() => {
		const fetchArtist = async () => {
			const response = await getArtist(name)
			if (response?.err === 0) {
				setArtist(response?.data)
			}
		}
		fetchArtist()
	}, [name])

	console.log(artist)

	return (
		<div className={cx('wrapper')}>
			<div className={cx('info')}>
				<div className={cx('info-left')}>
					<Image
						src={artist?.thumbnailM}
						alt="thumnail"
					/>
				</div>
				<div className={cx('info-right')}>
					<h1 className={cx('info-right__name')}>
						<span>{artist?.realname}</span> ~ <span>{artist?.alias}</span>
					</h1>
					<div className={cx('info-right__date')}>
						{artist?.birthday && (
							<span>
								Năm sinh: {artist?.birthday}
							</span>
						)}
					</div>
					<div className={cx('info-right__national')}>
						{artist?.national && (
							<span>
								Quốc tịch: {artist?.national}
							</span>
						)}
					</div>
					<div className={cx('info-right__biography')}>
						<span>
							{artist?.biography ? (artist?.biography?.replace(/<br>/g, '').length > 500 ? `${artist?.biography?.replace(/<br>/g, '').slice(0, 500)} . . . ` : `${artist?.biography?.replace(/<br>/g, '')}`) : (artist?.sortBiography?.replace(/<br>/g, '').length > 160 ? `${artist?.sortBiography?.replace(/<br>/g, '').slice(0, 160)} . . . ` : `${artist?.sortBiography?.replace(/<br>/g, '')}`)}
						</span>

						{artist?.biography?.length > 500 && <span onClick={() => setIsModal(prev => !prev)} className={cx('info-right__more')}> Xem thêm </span>}
					</div>
					<div className={cx('info-right__button')}>
						<div className={cx('info-right__follow')}>
							<span>{`${formatNumber(artist?.totalFollow)} theo dõi`}</span>
						</div>
						<Button
							icon={<UserIcon w="1.6rem" h="1.6rem" />}
							title="Follow"
							large
						/>
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
								Mới Phát Hành
							</h3>
						</div>
						<div className={cx('section-left__body')}>
							<div className={cx('section-left__thumbail')}>
								<Image
									src={artist?.topAlbum?.thumbnailM}
									alt="thumnail"
								/>
							</div>
							<div className={cx('section-left__info')}>
								<span className={cx('section-left__type')}>{artist?.topAlbum?.textType}</span>
								<div className={cx('section-left__box')}>
									<h3 className={cx('section-left__title')}>{artist?.topAlbum?.title}</h3>
									<div className={cx('section-left__artists')}>
										<span>
											{artist?.topAlbum?.artistsNames}
										</span>
									</div>
									<span className={cx('section-right__date')}>{artist?.topAlbum?.releaseDate}</span>
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
							Mới Phát Hành
						</h3>
						<Link
							to={`/${artist?.link?.split('/')?.[2] ?? artist?.link?.split('/')?.[1]}/bai-hat`}
							className={cx('section-right__all')}
						>
							Tất Cả
						</Link>
					</div>
					<div className={cx('section-right__body')}>
						{artist?.sections?.[0]?.items?.filter((item, index) => index < 3)?.map(song => (
							<Song key={song?.encodeId} song={song} />
						))}
					</div>
				</div>
			</div>

			{artist?.sections?.filter(item => !(item?.sectionType === 'song'))?.map((section, index) => (
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
