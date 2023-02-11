import Slider from '@mui/material/Slider'
import classNames from 'classnames/bind'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { MicroIcon, NoVolumeIcon, VolumeIcon } from '../../../components/Icons'
import { Image } from '../../../components/Image'
import { setVolume } from '../../../redux/actions'
import { song as apiSong } from '../../../services/musicService'
import { formatLink } from '../../../utils/fnc'
import { default as Control } from './Control'
import styles from './Player.module.scss'
import { default as Progress } from './Progress'

const cx = classNames.bind(styles)

const styleSilder = {
    color: '#facd66',
    width: 160,
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

const Player = () => {
    // State
    const [sources, setSources] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [currentTime, setCurrentTime] = useState(0)
    const [isVolume, setIsVolume] = useState(true)
    const audioRef = useRef()

    // Redux state
    const dispath = useDispatch()
    const { curSongId, curSong, volume } = useSelector((state) => state.music)

    useEffect(() => {
        const fetchApiSong = async () => {
            setIsLoading(true)
            const response = await apiSong(curSongId)
            // Sourse
            if (response?.err === 0) {
                setIsLoading(false)
                setSources(response?.data?.['128'])
                audioRef.current.pause()
            }
        }

        fetchApiSong()
    }, [curSongId])

    // Handle volume
    const handleVolume = () => {
        setIsVolume((prev) => !prev)
    }

    useEffect(() => {
        if (isVolume) {
            audioRef.current.volume = volume.beforeVolume / 100
        } else {
            audioRef.current.volume = volume.currentVolume / 100
        }
    }, [isVolume])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('info')}>
                <div className={cx('info__left')}>
                    <Image src={curSong?.thumbnail} alt="thumnail" />
                </div>
                <div className={cx('info__right')}>
                    <h3 className={cx('info__title')}>{curSong?.title}</h3>
                    {curSong?.artists
                        ?.filter((item, index) => index < 1)
                        ?.map((artist, index) => (
                            <Link key={index} to={`/${formatLink(artist?.link)}`} className={cx('info__artist')}>
                                {artist?.name}
                            </Link>
                        ))}
                </div>
            </div>
            <div className={cx('player')}>
                <Control sources={sources} isLoading={isLoading} audioRef={audioRef} />
                <audio
                    src={sources}
                    ref={audioRef}
                    onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
                ></audio>
                <Progress duration={curSong?.duration} currentTime={currentTime} audioRef={audioRef} />
            </div>
            <div className={cx('volume')}>
                <div className={cx('icons')}>
                    <span className={cx('icons__micro')}>
                        <MicroIcon w="1.8rem" h="1.8rem" />
                    </span>
                    <span className={cx('icons__volume')} onClick={handleVolume}>
                        {isVolume ? <VolumeIcon w="1.8rem" h="1.8rem" /> : <NoVolumeIcon w="1.8rem" h="1.8rem" />}
                    </span>
                </div>
                <div className={cx('track')}>
                    <Slider
                        aria-label="Volume"
                        min={0}
                        max={100}
                        value={isVolume ? volume.beforeVolume : volume.currentVolume}
                        sx={styleSilder}
                        onChange={(e, value) => {
                            audioRef.current.volume = value / 100

                            if (value === 0) setIsVolume(false)
                            else setIsVolume(true)

                            if (isVolume) {
                                dispath(setVolume(0, value))
                            } else {
                                dispath(setVolume(value, 0))
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Player
