import React from 'react'
import classNames from 'classnames/bind'
import styles from './NotFound.module.scss'
import { DicsMusicIcon } from '../../components/Icons'

const cx = classNames.bind(styles)

const NotFound = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('no-content')}>
                <DicsMusicIcon w="8rem" h="8rem" />
                <span>Lỗi Đường Dẫn Vui Lòng Thông Cảm </span>
            </div>
        </div>
    )
}

export default NotFound
