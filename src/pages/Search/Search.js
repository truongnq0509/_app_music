import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './Search.module.scss'
import _ from 'lodash'
import { formatNumber, formatLink } from '../../utils/fnc'
import { Image } from '../../components/Image'
import { DicsMusicIcon } from '../../components/Icons'
import { Sections } from '../../components/Sections'
import { Song } from '../../components/Song'

const cx = classNames.bind(styles)

const Search = () => {
    const navigate = useNavigate()
    const { search: result } = useSelector((state) => state.app)
    const counter = !_.isEmpty(result) && Object.values(result?.counter)

    return (
        <div className={cx('main')}>
            {(result?.artists || result?.songs) && (
                <>
                    <h3 className={cx('title')}>Nổi Bật</h3>
                    <div className={cx('list')}>
                        {result?.artists
                            ?.filter((item, index) => index < 1)
                            ?.map((artist, index) => (
                                <div
                                    key={index}
                                    className={cx('item')}
                                    onClick={() => navigate(`/${formatLink(artist?.link)}`)}
                                >
                                    <div
                                        className={cx('item-left', {
                                            full: true,
                                        })}
                                    >
                                        <Image src={artist?.thumbnail} alt="avatar" />
                                    </div>
                                    <div className={cx('item-right')}>
                                        <span className={cx('item-right__text')}>Nghệ sĩ</span>
                                        <h4 className={cx('item-right__title')}>{artist?.name}</h4>
                                        <span className={cx('item-right__text')}>{`${formatNumber(
                                            artist?.totalFollow,
                                        )} theo dõi`}</span>
                                    </div>
                                </div>
                            ))}

                        {result?.songs
                            ?.filter((item, index) => index < 2)
                            ?.map((song, index) => (
                                <div className={cx('item')} key={index}>
                                    <div className={cx('item-left')}>
                                        <Image src={song?.thumbnail} alt="avatar" />
                                    </div>
                                    <div className={cx('item-right')}>
                                        <span className={cx('item-right__text')}>Bài hát</span>
                                        <h4 className={cx('item-right__title')}>{song?.title}</h4>
                                        <Link
                                            to={`/${formatLink(song?.artists?.[0]?.link)}`}
                                            className={cx('item-right__link')}
                                        >
                                            {song?.artists?.[0]?.name}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                    </div>
                </>
            )}

            {/* playlist */}
            {result?.songs && (
                <div className={cx('section')}>
                    <h3 className={cx('section__title')}>Bài Hát</h3>
                    <div className={cx('section__list')}>
                        {result?.songs
                            ?.filter?.((item, index) => index < 6)
                            ?.map((song) => (
                                <div key={song.encodeId} className={cx('section__item')}>
                                    <Song song={song} />
                                </div>
                            ))}
                    </div>
                </div>
            )}

            {/* playlist */}
            {result?.playlists && (
                <Sections
                    data={{
                        items: result?.playlists,
                        title: 'Playlist/Album',
                    }}
                    limit={6}
                    isLoading={false}
                    hasTitleArtist
                />
            )}

            {/* mv */}
            {result?.videos && (
                <Sections
                    data={{
                        items: result?.videos,
                        title: 'MV',
                    }}
                    limit={3}
                    isLoading={false}
                    hasTitleArtist
                    isVideo
                />
            )}

            {/* artists */}
            {result?.artists && (
                <Sections
                    data={{
                        items: result?.artists,
                        title: 'Nghệ Sĩ/OA',
                    }}
                    limit={6}
                    isLoading={false}
                    isArtist
                />
            )}

            {/* not result */}
            {_.isArray(counter) && counter?.every((item) => item === 0) && (
                <div className={cx('no-content')}>
                    <DicsMusicIcon w="8rem" h="8rem" />
                    <span>Không có kết quả nào được tìm thấy</span>
                </div>
            )}
        </div>
    )
}

export default Search
