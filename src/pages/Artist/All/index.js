import React from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { useTitle } from '../../../hooks'
import classNames from 'classnames/bind'
import styles from '../Artist.module.scss'
import { Sections } from '../../../components/Sections'
import { Song } from '../../../components/Song'

const cx = classNames.bind(styles)

const All = () => {
    const { type } = useParams()
    const { artist } = useSelector((state) => state.artist)

    // Set title
    useTitle(`${artist?.name} - Dev Music Official Account`)

    // Set scroll
    window.scrollTo(0, 0)

    // Filter of type
    const data = artist?.sections?.find((item) => item?.link?.split('/')?.[item?.link?.split('/')?.length - 1] === type)

    return (
        <>
            {data?.sectionType === 'song' ? (
                <>
                    <h3 className={cx('title')}>{`${artist?.name} ~ Tất Cả ${data?.title}`}</h3>
                    <div className={cx('playlist')}>
                        {data?.items?.map((song) => (
                            <Song key={song?.encodeId} song={song} />
                        ))}
                    </div>
                </>
            ) : (
                <Sections
                    data={{
                        ...data,
                        title: `${artist?.name} ~ Tất Cả ${data?.title}`,
                        artist: artist?.name,
                    }}
                    hasTitleArtist={data?.sectionType === 'video' || data?.sectionType === 'playlist'}
                    isVideo={data?.sectionType === 'video'}
                    isArtist={data?.sectionType === 'artist'}
                    noPadding
                />
            )}
        </>
    )
}

export default All
