import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './Sections.module.scss'
import { Skeleton } from '@mui/material'
import { SectionItemSkeleton } from './SectionItem'

const cx = classNames.bind(styles)

const Sections = ({ data, limit = 6, isVideo = false, isArtist = false, noPadding = false }) => {
    const { type } = useParams()

    return Array(limit)
        .fill(0)
        .map((item, index) => (
            <div className={cx('wrapper')} key={index}>
                <div className={cx('header')}>
                    {!isVideo && (
                        <h3
                            className={cx('title', {
                                'p-0': noPadding,
                            })}
                        >
                            <Skeleton sx={{ fontSize: '3.6rem', width: '160px' }} />
                        </h3>
                    )}

                    {data?.link && !type && (
                        <Link className={cx('all')}>
                            <Skeleton sx={{ fontSize: '3.6rem', width: '100px' }} />
                        </Link>
                    )}
                </div>
                <div className={cx('section-playlist')}>
                    {Array(isVideo ? 3 : 6)
                        .fill(0)
                        .map((item, index) => (
                            <div
                                key={index}
                                className={cx('section-playlist__item', {
                                    'item-3': isVideo,
                                })}
                            >
                                <SectionItemSkeleton data={{ isArtist, isVideo }} />
                                <div style={{ width: '100%', height: '16px' }}></div>
                            </div>
                        ))}
                </div>
            </div>
        ))
}

Sections.propTypes = {
    data: PropTypes.object,
    isVideo: PropTypes.bool,
    isArtist: PropTypes.bool,
}

export default memo(Sections)
