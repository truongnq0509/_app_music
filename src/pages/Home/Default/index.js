import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router'
import { useDispatch } from 'react-redux'
import { useTitle } from '../../../hooks'
import classNames from 'classnames/bind'
import styles from '../Home.module.scss'
import { home as apiHome } from '../../../services/homeService'
import { setHomeData } from '../../../redux/actions'

const cx = classNames.bind(styles)

const Default = () => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)

    useTitle('Dev Music | Nghe tải nhạc chất lượng cao trên desktop, mobile và TV')

    useEffect(() => {
        const fetchApiHome = async () => {
            const response = await apiHome()
            if (response?.err === 0) {
                dispatch(setHomeData(response?.data?.items))
                setIsLoading(false)
            }
        }

        fetchApiHome()
    }, [])

    return (
        <div className={cx('wrapper')}>
            <Outlet context={[isLoading]} />
        </div>
    )
}

export default Default
