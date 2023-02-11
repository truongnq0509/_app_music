import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames/bind'
import styles from '../Player.module.scss'
import _, { random } from 'lodash'
import {
    ShuffleIcon,
    NextIcon,
    PrevIcon,
    RepeateIcon,
    PlayIcon,
    LoadingIcon,
    MenuIcon as PauseIcon,
} from '../../../../components/Icons'
import { setPlaying, setCurSongId, setCurSong } from '../../../../redux/actions'

const cx = classNames.bind(styles)

const Control = ({ sources, isLoading, audioRef }) => {
    // State
    const [isShuffle, setIsShuffle] = useState(false)
    const [isRepeat, setIsRepeat] = useState(false)
    let songCurrentIndex = null
    let currentSong

    // Redux state
    const dispatch = useDispatch()
    const { playing, playlist, curSongId } = useSelector((state) => state.music)

    // console.log(playlist)

    useEffect(() => {
        if (playing) audioRef.current.play()
        else audioRef.current.pause()
    }, [playing, sources])

    // Toggle icon
    const togglePlay = () => {
        dispatch(setPlaying(!playing))
        if (playing) audioRef.current.play()
        else audioRef.current.pause()
    }

    // Handle next song
    const handleNextSong = () => {
        if (!_.isEmpty(playlist)) {
            const songs = playlist?.song?.items

            if (isShuffle) {
                // Handle radom song
                do {
                    songCurrentIndex = Math.ceil(Math.random() * songs?.length) - 1
                } while (curSongId === currentSong?.encodeId)
            } else {
                songs?.forEach((song, index) => {
                    if (song?.encodeId === curSongId) songCurrentIndex = index
                })

                if (songCurrentIndex >= songs?.length - 1) {
                    songCurrentIndex = 0
                } else if (isRepeat) {
                    // Handle repeat song
                    audioRef.current.load()
                    audioRef.current.play()
                } else {
                    songCurrentIndex += 1
                }
            }

            currentSong = songs[songCurrentIndex]
            dispatch(setCurSongId(currentSong?.encodeId))
            dispatch(
                setCurSong({
                    encodeId: currentSong?.encodeId,
                    title: currentSong?.title,
                    thumbnail: currentSong?.thumbnail,
                    duration: currentSong?.duration,
                    artists: currentSong?.artists,
                }),
            )
            dispatch(setPlaying(true))
        }
    }

    // Handle prev song
    const handlePrevSong = () => {
        if (!_.isEmpty(playlist)) {
            const songs = playlist?.song?.items

            if (isShuffle) {
                do {
                    songCurrentIndex = Math.ceil(Math.random() * songs?.length) - 1
                } while (curSongId === currentSong?.encodeId)
            } else {
                songs?.forEach((song, index) => {
                    if (song?.encodeId === curSongId) songCurrentIndex = index
                })

                if (songCurrentIndex <= 0) {
                    songCurrentIndex = songs?.length - 1
                } else if (isRepeat) {
                    // Handle repeat song
                    audioRef.current.load()
                    audioRef.current.play()
                } else {
                    songCurrentIndex -= 1
                }
            }

            currentSong = songs[songCurrentIndex]
            dispatch(setCurSongId(currentSong?.encodeId))
            dispatch(
                setCurSong({
                    encodeId: currentSong?.encodeId,
                    title: currentSong?.title,
                    thumbnail: currentSong?.thumbnail,
                    duration: currentSong?.duration,
                    artists: currentSong?.artists,
                }),
            )
            dispatch(setPlaying(true))
        }
    }

    // Handle shuffle song
    const handleShuffleSong = () => {
        setIsShuffle((prev) => !prev)
    }

    // Handle repeat song
    const handleRepeatSong = () => {
        setIsRepeat((prev) => !prev)
    }

    // Hết nhạc sang bài mới
    if (audioRef.current) {
        audioRef.current.onended = () => {
            if (isRepeat) {
                audioRef.current.play()
            } else {
                handleNextSong()
            }
        }
    }

    return (
        <div className={cx('control')}>
            <span
                className={cx('btn', 'btn--shuffle', {
                    active: isShuffle,
                })}
                onClick={handleShuffleSong}
            >
                <ShuffleIcon w="2rem" h="2rem" />
            </span>
            <span className={cx('btn')} onClick={handlePrevSong}>
                <PrevIcon w="2rem" h="2rem" />
            </span>
            <span className={cx('btn', 'btn--play')} onClick={togglePlay}>
                {isLoading ? (
                    <LoadingIcon className={cx('loading')} />
                ) : !playing ? (
                    <PlayIcon w="1.3rem" h="1.3rem" />
                ) : (
                    <PauseIcon w="1.6rem" h="1.6rem" className={cx('btn-paues')} />
                )}
            </span>
            <span className={cx('btn')} onClick={handleNextSong}>
                <NextIcon w="2rem" h="2rem" />
            </span>
            <span
                className={cx('btn', 'btn--repeat', {
                    active: isRepeat,
                })}
                onClick={handleRepeatSong}
            >
                <RepeateIcon w="2rem" h="2rem" />
            </span>
        </div>
    )
}

Control.propTypes = {
    sources: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    audioRef: PropTypes.object.isRequired,
}

export default Control
