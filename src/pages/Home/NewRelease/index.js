import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames/bind'
import styles from '../Home.module.scss'
import { setPlaylist } from '../../../redux/actions'
import { Skeleton } from '@mui/material'
import { Button } from '../../../components/Button'
import { Song, SongSkeleton } from '../../../components/Song'

const cx = classNames.bind(styles)

const category = {
    all: 'Tất Cả',
    vPop: 'Việt Nam',
    others: 'Quốc Tế',
}

const NewRelease = ({ isPage = false, isLoading = false }) => {
    const [active, setActive] = useState(0)

    const dispatch = useDispatch()
    const { newRelease } = useSelector((state) => state.app)
    const keys = newRelease?.items && Object.keys(newRelease?.items)

    // set scroll
    !isPage && window.scrollTo(0, 0)

    // set playlist redux
    useEffect(() => {
        if (keys) {
            dispatch(
                setPlaylist({
                    song: {
                        items: [...newRelease?.items?.all, ...newRelease?.items?.others, ...newRelease?.items?.vPop],
                    },
                }),
            )
        }
    }, [])

    return (
        <div className={cx('release')}>
            <h3
                className={cx('title', {
                    'm-0': !isPage,
                })}
            >
                {isLoading ? <Skeleton variant="rounded" width={180} height={36} /> : newRelease?.title}
            </h3>
            <div className={cx('box')}>
                <div className={cx('buttons')}>
                    {isLoading && (
                        <>
                            <Skeleton variant="rounded" width={100} height={40} />
                            <Skeleton variant="rounded" width={100} height={40} />
                            <Skeleton variant="rounded" width={100} height={40} />
                        </>
                    )}

                    {keys &&
                        !isLoading &&
                        keys?.map((item, index) => (
                            <Button
                                key={index}
                                title={category[item]}
                                large
                                className={cx({ active: active === index })}
                                handleClick={() => setActive(index)}
                            />
                        ))}
                </div>
                <Link to={newRelease?.link?.split('/')?.[1]} className={cx('all')}>
                    {isLoading ? <Skeleton variant="rounded" width={80} height={36} /> : isPage && 'Tất Cả'}
                </Link>
            </div>
            <div className={cx('list')}>
                {isLoading &&
                    Array(6)
                        .fill(0)
                        .map((i, index) => (
                            <div key={index} className={cx('item')}>
                                <SongSkeleton limit={1} />
                            </div>
                        ))}

                {keys &&
                    !isLoading &&
                    newRelease?.items[keys[active]]
                        ?.filter?.((item, index) => !isPage || index < 6)
                        ?.map((song) => (
                            <div
                                key={song.encodeId}
                                className={cx('item', {
                                    one: !isPage,
                                })}
                            >
                                <Song song={song} />
                            </div>
                        ))}
            </div>
        </div>
    )
}

NewRelease.propTypes = {
    isPage: PropTypes.bool,
    isLoading: PropTypes.bool,
}

export default NewRelease
