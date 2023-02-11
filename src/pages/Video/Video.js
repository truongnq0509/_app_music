import React, { useEffect, useState, useRef } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import ReactPlayer from 'react-player/file'
import moment from 'moment/moment'
import classNames from 'classnames/bind'
import styles from './Video.module.scss'
import { Skeleton } from '@mui/material'
import scrollIntoView from 'scroll-into-view-if-needed'
import Tippy from '@tippyjs/react/headless'
import { formatLink } from '../../utils/fnc'
import { useTitle } from '../../hooks'
import { Image } from '../../components/Image'
import Slider from '@mui/material/Slider'
import {
    NextIcon,
    PrevIcon,
    PlayIcon,
    MenuIcon,
    VolumeIcon,
    NoVolumeIcon,
    FullScreenIcon,
    SettingIcon,
    ScreenMini,
} from '../../components/Icons'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { Sections, SectionsSkeleton } from '../../components/Sections'
import { listMV as apiListMV, video as apiVideo } from '../../services/musicService'

const cx = classNames.bind(styles)

const styleSlider = {
    height: 4,
    width: '100%',
    color: '#facd66',
    '& .MuiSlider-thumb': {
        width: 0,
        height: 0,
        transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
        '&:before': {
            boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
        },
        '&:hover, &.Mui-focusVisible': {
            boxShadow: `0px 0px 0px 8px rgb(0 0 0 / 16%)`,
            width: 8,
            height: 8,
        },
        '&.Mui-active': {
            width: 12,
            height: 12,
        },
    },
    '& .MuiSlider-rail': {
        backgroundColor: 'rgba(255, 255, 255, 0.07)',
    },
}

const styleSliderVolume = {
    color: '#facd66',
    width: 80,
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        width: 0,
        height: 0,
        backgroundColor: '#fff',
        '&:before': {
            boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
        },
        '&:after': {
            width: 12,
            height: 12,
        },
        '&:hover, &.Mui-focusVisible, &.Mui-active': {
            boxShadow: 'none',
            width: 8,
            height: 8,
        },
    },
    '& .MuiSlider-rail': {
        backgroundColor: 'rgba(255, 255, 255, 0.07)',
    },
}

const Video = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    // Ref
    const videoRef = useRef()
    const controllRef = useRef()
    const activeRef = useRef()
    const scrollRef = useRef()

    // State
    const [video, setVideo] = useState({})
    const [videos, setVideos] = useState([])
    const [sources, setSources] = useState({})
    const [source, setSource] = useState([])
    const [recommends, setRecommends] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isShow, setIsShow] = useState(false)
    const [visible, setVisible] = useState(false)
    const [statePlayer, setStatePlayer] = useState({
        playing: true,
        muted: false,
        volume: {
            after: 0,
            before: 0.5,
        },
        currentTime: 0,
        currentId: id,
    })

    const { playing, volume, muted, currentTime, currentId } = statePlayer

    // Set title
    useTitle(`${video?.title} - ${video?.artist?.name} | Video Clip MV HD`)

    useEffect(() => {
        const fetchApiVideo = async () => {
            const res1 = await apiVideo(id)
            if (res1?.err === 0) {
                const fetchListMv = async () => {
                    const res2 = await Promise.all([
                        apiListMV(res1?.data?.genres?.[0]?.id, 1, 6),
                        apiListMV(res1?.data?.genres?.[1]?.id, 1, 6),
                        apiListMV(res1?.data?.genres?.[2]?.id, 1, 6),
                    ])

                    setVideos(res2?.filter((item) => item?.err === 0))
                }

                // Set video first
                res1?.data?.recommends?.unshift({
                    alias: res1?.data?.alias,
                    artist: res1?.data?.artist,
                    artists: res1?.data?.artists,
                    artistsNames: res1?.data?.alias,
                    duration: res1?.data?.duration,
                    encodeId: res1?.data?.encodeId,
                    isOffical: res1?.data?.isOffical,
                    isWorldWide: res1?.data?.isWorldWide,
                    link: res1?.data?.link,
                    streamingStatus: res1?.data?.streamingStatus,
                    thumbnail: res1?.data?.thumbnail,
                    thumbnailM: res1?.data?.thumbnailM,
                    title: res1?.data?.title,
                    username: res1?.data?.username,
                })

                fetchListMv()
                setVideo(res1?.data)
                setRecommends(res1?.data?.recommends)
            }
        }

        fetchApiVideo()
    }, [])

    useEffect(() => {
        const fetchApiVideo = async () => {
            setIsLoading(true)
            const res1 = await apiVideo(id)
            if (res1?.err === 0) {
                const fetchListMv = async () => {
                    const res2 = await Promise.all([
                        apiListMV(res1?.data?.genres?.[0]?.id, 1, 6),
                        apiListMV(res1?.data?.genres?.[1]?.id, 1, 6),
                        apiListMV(res1?.data?.genres?.[2]?.id, 1, 6),
                    ])

                    setVideos(res2?.filter((item) => item?.err === 0))
                }

                fetchListMv()
                setVideo(res1?.data)
                setSources({
                    isShow: false,
                    data: Object.entries(res1?.data?.streaming['mp4']).filter(([type, src]) => src !== ''),
                })
                setSource(
                    Object.entries(res1?.data?.streaming['mp4']).filter(([type, src]) => src !== '')[
                        Object.entries(res1?.data?.streaming['mp4']).filter(([type, src]) => src !== '').length - 1
                    ],
                )
                setStatePlayer({
                    ...statePlayer,
                    currentId: res1?.data.encodeId,
                })
                setIsLoading(false)
            }
        }

        fetchApiVideo()
    }, [id])

    // Handle show setting
    const show = () => setVisible(true)
    const hide = () => setVisible(false)

    // Handle video
    const handleSeekTo = (e, value) => {
        videoRef?.current?.seekTo(value)
    }

    const handleChangeVolume = (e, value) => {
        setStatePlayer({
            ...statePlayer,
            muted: value === 0 ? true : false,
            volume: {
                after: muted ? 0 : value / 100,
                before: muted ? value / 100 : 0,
            },
        })
    }

    const handleClickVolume = (e) => {
        setStatePlayer({
            ...statePlayer,
            muted: !muted,
        })
    }

    const handlePlayingVideo = () => {
        setStatePlayer({
            ...statePlayer,
            playing: !playing,
        })
    }

    const openFullScreen = (e) => {
        if (videoRef.current.wrapper.requestFullscreen) {
            videoRef.current.wrapper.requestFullscreen()
        } else if (videoRef.current.wrapper.mozRequestFullScreen) {
            /* Firefox */
            videoRef.current.wrapper.mozRequestFullScreen()
        } else if (videoRef.current.wrapper.webkitRequestFullscreen) {
            /* Chrome, Safari & Opera */
            videoRef.current.wrapper.webkitRequestFullscreen()
        } else if (videoRef.current.wrapper.msRequestFullscreen) {
            /* IE/Edge */
            videoRef.current.wrapper = window.top.document.body //To break out of frame in IE
            videoRef.current.wrapper.msRequestFullscreen()
        }
    }

    const togglePictureInPicture = (e) => {
        if (document.pictureInPictureElement) {
            document.exitPictureInPicture()
        } else if (document.pictureInPictureEnabled) {
            videoRef.current.wrapper.children[0].requestPictureInPicture()
        }
    }

    const handleNextVideo = () => {
        let currentIndex = 0
        let currentVideo = null

        recommends?.forEach((video, index) => {
            if (video.encodeId === currentId) {
                currentIndex = index
            }
        })

        if (currentIndex < 0) {
            currentIndex = recommends.length - 1
        } else if (currentIndex >= recommends.length - 1) {
            currentIndex = 0
        } else {
            currentIndex++
        }

        currentVideo = recommends[currentIndex]
        navigate(currentVideo?.link?.split('.')[0])
        setStatePlayer({
            ...statePlayer,
            playing: true,
        })

        scrollIntoView(activeRef.current, {
            behavior: 'smooth',
            block: 'start',
            scrollMode: 'if-needed',
            boundary: scrollRef.current,
        })
    }

    const handlePrevVideo = () => {
        let currentIndex = 0
        let currentVideo = null

        recommends?.forEach((video, index) => {
            if (video.encodeId === currentId) {
                currentIndex = index
            }
        })

        if (currentIndex <= 0) {
            currentIndex = recommends.length - 1
        } else if (currentIndex >= recommends.length - 1) {
            currentIndex = 0
        } else {
            currentIndex--
        }

        currentVideo = recommends[currentIndex]
        navigate(currentVideo?.link?.split('.')[0])
        setStatePlayer({
            ...statePlayer,
            playing: true,
        })

        scrollIntoView(activeRef.current, {
            behavior: 'smooth',
            block: 'start',
            scrollMode: 'if-needed',
            boundary: scrollRef.current,
        })
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('info')}>
                    <div className={cx('info__img')}>
                        {isLoading ? (
                            <Skeleton variant="rounded" width={100} height={100} />
                        ) : (
                            <Image src={video?.artist?.thumbnail} alt="avatar" />
                        )}
                    </div>
                    <div className={cx('info__title')}>
                        {isLoading ? (
                            <Skeleton variant="text" sx={{ fontSize: '1.8rem' }} width="180px" />
                        ) : (
                            <h3 className={cx('info__name')}>{video?.title}</h3>
                        )}

                        {isLoading ? (
                            <Skeleton variant="text" sx={{ fontSize: '1.8rem' }} width="250px" />
                        ) : (
                            <div className={cx('info__artists')}>
                                {video?.artists?.map((artist, index, arr) => (
                                    <Link key={index} to={`/${formatLink(artist?.link)}`} className={cx('info__link')}>
                                        {index === arr?.length - 1 ? `${artist?.name}` : `${artist?.name}, `}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className={cx('body')}>
                <div
                    className={cx('body-left')}
                    onMouseEnter={() => setIsShow(true)}
                    onMouseLeave={() => setIsShow(false)}
                    onClick={(e) => {
                        if (!e.target.closest(`.${controllRef?.current?.className.split(' ')[1]}`)) {
                            handlePlayingVideo()
                        }
                    }}
                >
                    {isLoading ? (
                        <Skeleton variant="rounded" width="100%" height="100%" />
                    ) : (
                        <ReactPlayer
                            playing={playing}
                            width="100%"
                            height="100%"
                            url={source?.[1]}
                            ref={videoRef}
                            volume={muted ? volume.before : volume.after}
                            progressInterval={400}
                            onEnded={handleNextVideo}
                            onProgress={(e) =>
                                setStatePlayer({
                                    ...statePlayer,
                                    currentTime: e?.playedSeconds,
                                })
                            }
                        />
                    )}

                    {/* Controll */}
                    <div
                        ref={controllRef}
                        className={cx('body-left__wrapper', {
                            active: isShow || !playing,
                        })}
                    >
                        <Slider
                            aria-label="time-indicator"
                            size="small"
                            value={currentTime}
                            min={0}
                            max={videoRef?.current?.getDuration()}
                            step={1}
                            sx={styleSlider}
                            onChange={handleSeekTo}
                        />
                        <div className={cx('body-left__controll')}>
                            <div className={cx('body-left__controll-left')}>
                                <span onClick={handlePrevVideo}>
                                    <PrevIcon w="2.2rem" h="2.2rem" />
                                </span>
                                <span onClick={handlePlayingVideo}>
                                    {playing ? (
                                        <span style={{ display: 'inline-flex', transform: 'rotate(90deg)' }}>
                                            <MenuIcon w="2rem" h="2rem" />
                                        </span>
                                    ) : (
                                        <span>
                                            <PlayIcon w="2rem" h="2rem" />
                                        </span>
                                    )}
                                </span>
                                <span onClick={handleNextVideo}>
                                    <NextIcon w="2.2rem" h="2.2rem" />
                                </span>

                                {/* Volume */}
                                <div className={cx('body-left__controll-volume')}>
                                    <span onClick={handleClickVolume}>
                                        {!muted ? <VolumeIcon w="2rem" h="2rem" /> : <NoVolumeIcon w="2rem" h="2rem" />}
                                    </span>
                                    <Slider
                                        aria-label="Volume"
                                        min={0}
                                        max={100}
                                        value={muted ? volume.before * 100 : volume.after * 100}
                                        sx={styleSliderVolume}
                                        onChange={handleChangeVolume}
                                    />
                                </div>

                                {/* Duration */}
                                <div className={cx('body-left__controll-duration')}>
                                    <span>{moment.utc(currentTime * 1000).format('mm:ss')}</span>
                                    <span>|</span>
                                    <span>{moment.utc(videoRef?.current?.getDuration() * 1000).format('mm:ss')}</span>
                                </div>
                            </div>
                            <div className={cx('body-left__controll-right')}>
                                <div>
                                    <Tippy
                                        visible={visible}
                                        interactive
                                        placement="bottom-start"
                                        offset={[0, 24]}
                                        onClickOutside={hide}
                                        render={(attrs) => (
                                            <div {...attrs} className={cx('setting')}>
                                                {sources?.isShow && (
                                                    <div
                                                        className={cx('setting-header')}
                                                        onClick={() =>
                                                            setSources({
                                                                ...sources,
                                                                isShow: false,
                                                            })
                                                        }
                                                    >
                                                        <span>
                                                            <MdOutlineKeyboardArrowLeft size={20} />
                                                        </span>
                                                        <span>Chất Lượng</span>
                                                    </div>
                                                )}

                                                <div className={cx('setting-body')}>
                                                    {!sources?.isShow ? (
                                                        <div
                                                            className={cx('setting-item')}
                                                            onClick={() =>
                                                                setSources({
                                                                    ...sources,
                                                                    isShow: true,
                                                                })
                                                            }
                                                        >
                                                            <span>Chất Lượng</span>
                                                            <span>
                                                                <span>{source[0]}</span>
                                                                <span>
                                                                    <MdOutlineKeyboardArrowRight size={20} />
                                                                </span>
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        sources?.data?.map((source, index) => (
                                                            <div
                                                                key={index}
                                                                className={cx('setting-item')}
                                                                onClick={() => setSource(source)}
                                                            >
                                                                <span>
                                                                    <span>{source[0]}</span>
                                                                </span>
                                                            </div>
                                                        ))
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    >
                                        <span
                                            className={cx({
                                                hd: source[0] == '720p' || source[0] == '1080p',
                                            })}
                                            onClick={visible ? hide : show}
                                        >
                                            <SettingIcon
                                                w="2.2rem"
                                                h="2.2rem"
                                                className={cx({
                                                    turn: visible,
                                                })}
                                            />
                                        </span>
                                    </Tippy>
                                </div>
                                <span onClick={togglePictureInPicture}>
                                    <ScreenMini w="2.2rem" h="2.2rem" />
                                </span>
                                <span onClick={openFullScreen}>
                                    <FullScreenIcon w="2.2rem" h="2.2rem" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('body-right')}>
                    <div className={cx('body-right__container')}>
                        <h3>Danh Sách Phát</h3>

                        <span className={cx('body-right__playing')}>
                            <span>Tự Động Phát</span>
                            <label className={cx('body-right__btn')}>
                                <input type="checkbox" />
                                <span className={cx('body-right__slider')}></span>
                            </label>
                        </span>
                    </div>
                    <div ref={scrollRef} className={cx('body-right__list')}>
                        {isLoading
                            ? Array(12)
                                  .fill(0)
                                  .map((item, index) => (
                                      <div key={index} className={cx('body-right__item')}>
                                          <div className={cx('body-right__image')} style={{ display: 'block' }}>
                                              <Skeleton variant="rounded" width="200px" height="200px" />
                                              <p>Đang Phát</p>
                                          </div>
                                          <div className={cx('body-right__info')}>
                                              <Skeleton variant="text" sx={{ fontSize: '1.8rem' }} width="120px" />
                                              <Skeleton variant="text" sx={{ fontSize: '1.8rem' }} width="180px" />
                                          </div>
                                      </div>
                                  ))
                            : recommends?.map((item, index) => (
                                  <div
                                      key={index}
                                      ref={currentId === item?.encodeId ? activeRef : null}
                                      className={cx('body-right__item', {
                                          active: currentId === item?.encodeId,
                                      })}
                                  >
                                      <div
                                          className={cx('body-right__image')}
                                          onClick={(e) => navigate(item?.link?.split('.')[0])}
                                      >
                                          <Image src={item?.thumbnailM} alt="thumnail" />
                                          <p>Đang Phát</p>
                                      </div>
                                      <div className={cx('body-right__info')}>
                                          <h3 onClick={(e) => navigate(item?.link?.split('.')[0])}>{item?.title}</h3>
                                          <div className={cx('body-right__artists')}>
                                              {item?.artists
                                                  ?.filter((item, index) => index < 3)
                                                  ?.map((artist, index, arr) => (
                                                      <Link key={index} to={`/${formatLink(artist?.link)}`}>
                                                          {index === arr?.length - 1
                                                              ? artist?.name
                                                              : `${artist?.name}, `}
                                                      </Link>
                                                  ))}
                                          </div>
                                      </div>
                                  </div>
                              ))}
                    </div>
                </div>
            </div>

            {isLoading ? (
                <>
                    <div style={{ padding: '20px' }}></div>
                    <SectionsSkeleton
                        data={{
                            title: 'Xem Thêm',
                        }}
                        isVideo
                        limit={2}
                    />
                </>
            ) : (
                videos?.map((item, index) => (
                    <Sections
                        key={index}
                        data={{
                            items: item?.data?.items,
                            title: 'Xem Thêm',
                        }}
                        isVideo
                        hasTitleArtist
                    />
                ))
            )}
        </div>
    )
}

export default Video
