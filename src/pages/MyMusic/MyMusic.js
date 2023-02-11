import React from 'react'
import classNames from 'classnames/bind'
import { useOutletContext } from 'react-router-dom'
import styles from './MyMusic.module.scss'
import { Song } from '../../components/Song'
import { Sections } from '../../components/Sections'

const cx = classNames.bind(styles)

const MyMusic = () => {
    const [songs, albums, type] = useOutletContext()

    return (
        <>
            {type === 'song' && (
                <div className={cx('playlist')}>
                    {songs.map((song, index) => (
                        <Song key={index} song={song} songActive />
                    ))}
                </div>
            )}

            {type === 'album' && (
                <Sections
                    data={{
                        items: albums,
                        title: '',
                    }}
                    hasTitleAlbum
                    hasTitleSong
                    activeAlbum
                />
            )}
        </>
    )
}

export default MyMusic
