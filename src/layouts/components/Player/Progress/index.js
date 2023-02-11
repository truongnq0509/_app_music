import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from '../Player.module.scss'
import moment from 'moment/moment'
import Slider from '@mui/material/Slider'

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

const Progress = ({ duration, currentTime, audioRef }) => {
    const handleOnChange = (_, value) => {
        audioRef.current.currentTime = value
    }

    return (
        <div className={cx('progress')}>
            <span className={cx('progress__left')}>{moment.utc(currentTime * 1000).format('mm:ss')}</span>
            <div className={cx('progress__center')}>
                <Slider
                    aria-label="time-indicator"
                    size="small"
                    value={currentTime}
                    min={0}
                    max={duration}
                    step={1}
                    sx={styleSlider}
                    onChange={handleOnChange}
                />
            </div>
            <span className={cx('progress__right')}>{moment.utc(duration * 1000).format('mm:ss')}</span>
        </div>
    )
}

Progress.propTypes = {
    duration: PropTypes.number.isRequired,
    audioRef: PropTypes.object.isRequired,
    currentTime: PropTypes.number.isRequired,
}

export default Progress
