import classNames from 'classnames/bind'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { auth } from '../../config/firebase'
import { createFavoritesAlbums, deleteFavoritesAlbums } from '../../services/firebase'
import { DotIcon, HeartIcon, PlayIcon } from '../Icons'
import styles from './Image.module.scss'

const cx = classNames.bind(styles)

const Image = ({ src = '', alt = '', options = {}, data, handleClick = () => {} }) => {
    // State
    const [isLike, setIsLike] = useState(false)
    const { isArtist, isVideo, activeAlbum } = options

    // Router
    const navigate = useNavigate()

    // Auth
    const [user, loading] = useAuthState(auth)

    const handleFavoriteSong = async () => {
        setIsLike((prev) => !prev)

        if (user) {
            if (!isLike && activeAlbum === false) {
                await createFavoritesAlbums(user, data)
                toast('Đã thêm album vào thư viện', {
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
            } else {
                await deleteFavoritesAlbums(user, data)
                toast('Đã xóa album khỏi thư viện', {
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
        <div className={cx('wrapper')}>
            <img src={src} alt={alt} />
            <div className={cx('overlay')} onClick={handleClick}></div>

            {!isArtist && !_.isEmpty(options) && (
                <div className={cx('options')}>
                    {!isVideo && (
                        <span
                            onClick={handleFavoriteSong}
                            className={cx('options__left', {
                                active: isLike || activeAlbum,
                            })}
                        >
                            <HeartIcon w="1.8rem" h="1.8rem" />
                        </span>
                    )}

                    <span onClick={handleClick} className={cx('options__center')}>
                        <PlayIcon w="1.4rem" h="1.4rem" />
                    </span>

                    {!isVideo && (
                        <span className={cx('options__right')}>
                            <DotIcon w="1.8rem" h="1.8rem" />
                        </span>
                    )}
                </div>
            )}
        </div>
    )
}

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string.isRequired,
    options: PropTypes.object,
    handleClick: PropTypes.func,
}

export default Image
