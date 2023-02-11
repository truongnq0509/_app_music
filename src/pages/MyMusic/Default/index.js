import classNames from 'classnames/bind'
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router'
import { Button } from '../../../components/Button'
import { EmptyAlbum, EmptySong } from '../../../components/Icons'
import { useTitle } from '../../../hooks'
import styles from '../MyMusic.module.scss'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../config/firebase'
import { useFirestore } from '../../../hooks'

const cx = classNames.bind(styles)

const Default = () => {
    // Auth
    const [user, loading] = useAuthState(auth)

    // State
    const songs = useFirestore(user, 'songs', 'favoriteSongs')
    const albums = useFirestore(user, 'albums', 'favoriteAlbums')

    // Router
    const navigate = useNavigate()
    const { type } = useParams()

    useTitle('Nhạc cá nhân | Xem bài hát, album, MV đang hot nhất hiện tại')

    useEffect(() => {
        navigate('/mymusic/song')
    }, [])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Button
                    title="Bài Hát"
                    large
                    className={cx({ active: type === 'song' })}
                    handleClick={() => navigate('/mymusic/song')}
                />
                <Button
                    title="Album"
                    large
                    className={cx({ active: type === 'album' })}
                    handleClick={() => navigate('/mymusic/album')}
                />
            </div>
            <div className={cx('body')}>
                <Outlet context={[songs, albums, type]} />
                {(!songs || !songs.length) && (!albums || !albums.length) && (
                    <div className={cx('empty')}>
                        {type === 'song' ? (
                            <EmptySong w="9rem" h="9rem" className={cx('icon')} />
                        ) : (
                            <EmptyAlbum w="9rem" h="9rem" className={cx('icon')} />
                        )}
                        <p>{`Chưa ${type === 'song' ? 'có bài hát nào' : 'có album'} trong thư viện các nhân`}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Default
