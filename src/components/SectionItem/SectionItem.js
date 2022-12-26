import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless'
import classNames from "classnames/bind"
import styles from './SectionItem.module.scss'
import { Tooltip } from "../Tooltip"
import { Image } from "../Image";
import { useDebounce } from "../../hooks";
import { getArtist } from "../../services/artistService";
import { setIsTooltip, setArtist } from "../../redux/actions"
import { PlayIcon, HeartIcon, DotIcon, UserIcon } from "../Icons"
import { Button } from "../Button";
import { formatNumber } from "../../utils/fnc";

const cx = classNames.bind(styles)

const SectionItem = ({ data }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [isLike, setIsLike] = useState(false)
	const [alias, setAlias] = useState('')
	const { isTooltip, artist } = useSelector(state => state.artist)
	const { item, hasTitleAlbum, hasTitleSong, hasTitleArtist, isVideo, isArtist } = data

	const debounceValue = useDebounce(alias, 700)

	useEffect(() => {
		const fetchArtist = async () => {
			dispatch(setIsTooltip(false))
			const response = await getArtist(debounceValue)
			if (response?.err === 0) {
				dispatch(setArtist(response?.data))
				dispatch(setIsTooltip(true))
			}
		}

		if (debounceValue) {
			fetchArtist()
		}
	}, [debounceValue])

	const resultInfoArtist = attrs => (isTooltip && <Tooltip attrs={attrs} data={artist} />)

	return (
		<div className={cx('wrapper')}>
			<div className={cx('image', {
				'full': isArtist
			})}>
				<Image
					src={item?.thumbnailM}
					alt="avatar"
					handleClick={() => {
						navigate(item?.link?.split('.')[0])
					}}
				/>
				{!isArtist && (
					<div className={cx('options')}>
						{!isVideo && (
							<span
								onClick={() => setIsLike(prev => !prev)}
								className={cx('options__left', {
									'active': isLike
								})}
							>
								<HeartIcon w="1.8rem" h="1.8rem" />
							</span>
						)}

						<span className={cx('options__center')}>
							<PlayIcon w="1.8rem" h="1.8rem" />
						</span>

						{!isVideo && (
							<span className={cx('options__right')}>
								<DotIcon w="1.8rem" h="1.8rem" />
							</span>
						)}
					</div>
				)}
			</div>
			<div className={cx('content')}>
				<h4 className={cx('title')}>
					{(hasTitleSong || hasTitleArtist) && item?.title}
				</h4>
				<div className={cx('box')}>
					{(hasTitleAlbum || hasTitleSong) && (
						<div className={cx('description')}>
							{item?.sortDescription}
						</div>
					)}

					{hasTitleArtist && (
						<div className={cx('artists')}>
							{item?.artists?.filter((item, index) => index < 3)?.map((artist, index) => (
								<span
									key={artist?.id}
								>
									<Tippy
										interactive
										delay={[0, 400]}
										offset={[0, 5]}
										placement="bottom-start"
										render={resultInfoArtist}
										maxWidth={"20px"}
									>
										<Link
											onMouseOver={() => {
												dispatch(setIsTooltip(false))
												setAlias(artist?.alias)
											}}
											key={artist?.id}
											to={`/${artist?.link?.split('/')?.[artist?.link?.split('/')?.length - 1]}`}
										>
											{artist?.name}
										</Link>
									</Tippy>
									{(index === item?.artists?.filter((item, index) => index < 3)?.length - 1) ? '' : ','}
									<span style={{ width: '6px', display: 'block' }}></span>
								</span>
							))}
						</div>
					)}
				</div>
				{isArtist && (
					<div className={cx('artist')}>
						<Link
							className={cx('artist__name')}
							to={`/${item?.link?.split('/')?.[item?.link?.split('/')?.length - 1]}`}
						>
							<span>{item?.name}</span>
						</Link>
						<span className={cx('artist__follow')}>
							{formatNumber(item?.totalFollow)}
						</span>
						<div className={cx('artist__button')}>
							<Button
								icon={<UserIcon w="1.6rem" h="1.6rem" />}
								title='Follow'
								small
							/>
						</div>
					</div>
				)}
			</div>
		</div >
	)
}

SectionItem.propTypes = {
	data: PropTypes.object.isRequired,
}

export default SectionItem
