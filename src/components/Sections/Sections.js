import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './Sections.module.scss'
import { SectionItem } from './SectionItem'

const cx = classNames.bind(styles)

const Sections = ({
    data,
    limit = data?.items?.length,
    hasTitleAlbum = false,
    hasTitleSong = false,
    hasTitleArtist = false,
    isVideo = false,
    isArtist = false,
    noPadding = false,
    activeAlbum = false,
}) => {
    const { type } = useParams()

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                {data?.title && (
                    <h3
                        className={cx('title', {
                            'p-0': noPadding,
                        })}
                    >
                        {data?.title}
                    </h3>
                )}

                {data?.link && !type && (
                    <Link to={data?.link?.split('/')?.[data?.link?.split('/')?.length - 1]} className={cx('all')}>
                        Tất Cả
                    </Link>
                )}
            </div>
            <div className={cx('section-playlist')}>
                {data &&
                    data?.items
                        ?.filter((item, index) => index < limit)
                        ?.map((item, index) => (
                            <div
                                key={index}
                                className={cx('section-playlist__item', {
                                    'item-3': isVideo,
                                })}
                            >
                                <SectionItem
                                    data={{
                                        item,
                                        hasTitleAlbum,
                                        hasTitleSong,
                                        hasTitleArtist,
                                        isVideo,
                                        isArtist,
                                        activeAlbum,
                                    }}
                                />
                            </div>
                        ))}
            </div>
        </div>
    )
}

Sections.propTypes = {
    data: PropTypes.object,
    limit: PropTypes.number,
    hasTitleAlbum: PropTypes.bool,
    hasTitleSong: PropTypes.bool,
    hasTitleArtist: PropTypes.bool,
    isVideo: PropTypes.bool,
    isArtist: PropTypes.bool,
    isLoading: PropTypes.bool,
    noPadding: PropTypes.bool,
    activeAlbum: PropTypes.bool,
}

export default memo(Sections)
