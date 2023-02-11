import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router'
import { useParams } from 'react-router'
import classNames from 'classnames/bind'
import styles from '../Artist.module.scss'
import { artist as apiArtist } from '../../../services/artistService'
import { setArtist } from '../../../redux/actions'

const cx = classNames.bind(styles)

const Default = () => {
    const { name } = useParams()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchArtist = async () => {
            setIsLoading(true)
            const response = await apiArtist(name)
            if (response?.err === 0) {
                dispatch(setArtist(response?.data))
                setIsLoading(false)
            }
        }
        fetchArtist()

        // Set scroll
        window.scrollTo(0, 0)
    }, [name])

    return (
        <div className={cx('wrapper')}>
            <Outlet context={[isLoading]} />
        </div>
    )
}

export default Default
