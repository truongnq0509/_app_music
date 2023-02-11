import classNames from 'classnames/bind'
import moment from 'moment'
import 'moment/locale/vi'
import PropTypes from 'prop-types'
import React, { memo, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { auth } from '../../config/firebase'
import { setCurSong, setCurSongId } from '../../redux/actions'
import { createFavoritesSongs, deleteFavoritesSongs } from '../../services/firebase'
import { DotIcon, HeartIcon } from '../Icons'
import { Image } from '../Image'
import styles from './Song.module.scss'
import { toast } from 'react-toastify'

const cx = classNames.bind(styles)

const Song = ({ song, songActive = false }) => {
    const [isLike, setIsLike] = useState(false)
    const [user, loading] = useAuthState(auth)

    const navigate = useNavigate()

    // Redux
    const dispatch = useDispatch()
    const { curSongId } = useSelector((state) => state.music)

    // setSongId -> redux
    const handleSong = (id, title, thumbnail, duration, artists) => {
        dispatch(setCurSongId(id))
        dispatch(
            setCurSong({
                encodeId: id,
                title,
                thumbnail,
                duration,
                artists,
            }),
        )
    }

    const handleFavoriteSong = async () => {
        setIsLike((prev) => !prev)

        if (user) {
            if (!isLike && songActive === false) {
                await createFavoritesSongs(user, song)
                toast('Đã thêm bài hát vào thư viện', {
                    position: 'top-center',
                    autoClose: 1200,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                    style: {
                        background: '#facd66',
                        fontSize: '1.4rem',
                        color: '#fff',
                    },
                })
                songActive = false
            } else {
                await deleteFavoritesSongs(user, song)
                toast('Đã xóa bài hát khỏi thư viện', {
                    position: 'top-center',
                    autoClose: 1200,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                    style: {
                        background: '#facd66',
                        fontSize: '1.4rem',
                        color: '#fff',
                    },
                })
            }
        } else {
            navigate('/login')
        }
    }
    return (
        <div
            className={cx('song', {
                active: song?.encodeId === curSongId,
            })}
        >
            <div className={cx('song__left')}>
                <div
                    className={cx('song__image', {
                        // vip: !song?.isWorldWide,
                    })}
                    onClick={() =>
                        handleSong(song?.encodeId, song?.title, song?.thumbnail, song?.duration, song?.artists)
                    }
                >
                    <Image src={song?.thumbnail} alt="thumbnail" />
                </div>
                <span
                    className={cx('song__heart', {
                        active: isLike || songActive,
                    })}
                    onClick={handleFavoriteSong}
                >
                    <HeartIcon w="1.8rem" h="1.8rem" />
                </span>
            </div>
            <div className={cx('song__center')}>
                <div className={cx('song__title')}>
                    <span>{`${song?.title} ~ `}</span>
                    {song?.artists?.map((artist, index) => (
                        <span key={artist?.id} className={cx('song__artist')}>
                            <Link to={`/${artist?.link?.split('/')?.[2] ?? artist?.link?.split('/')?.[1]}`}>
                                {artist?.name}
                            </Link>
                            {index === song?.artists?.length - 1 ? ' ' : ', '}
                        </span>
                    ))}
                </div>
                {song?.album?.title && <div className={cx('song__album')}>{<span>{song?.album?.title}</span>}</div>}
            </div>
            <div className={cx('song__right')}>
                <div className={cx('song__time')}>
                    <span>{moment.utc(song?.duration * 1000).format('m:ss')}</span>
                </div>

                <div className={cx('song__options')}>
                    <span>
                        <DotIcon w="1.6rem" h="1.6rem" />
                    </span>
                </div>
            </div>
        </div>
    )
}

Song.propTypes = {
    song: PropTypes.object.isRequired,
}

export default memo(Song)
