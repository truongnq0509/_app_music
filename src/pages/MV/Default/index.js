import React, { useEffect } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router'
import classNames from 'classnames/bind'
import styles from '../MV.module.scss'
import { useTitle } from '../../../hooks'
import { Button } from '../../../components/Button'

const cx = classNames.bind(styles)

const categorys = [
    { id: 'IWZ9Z08I', title: 'Việt Nam', alias: 'Viet-Nam' },
    { id: 'IWZ9Z08O', title: 'US-UK', alias: 'Au-My' },
    { id: 'IWZ9Z08W', title: 'KPOP', alias: 'Han-Quoc' },
    { id: 'IWZ9Z086', title: 'Hòa Tấu', alias: 'Khong-Loi' },
]

const Default = () => {
    const navigate = useNavigate()
    const { id } = useParams()

    useTitle('Videos | Nghe tải nhạc chất lượng cao trên desktop, mobile và TV')
    useEffect(() => {
        navigate(`${categorys[0]?.alias}/${categorys[0]?.id}`)
    }, [])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                {categorys.map((category) => (
                    <Button
                        key={category?.id}
                        title={category?.title}
                        handleClick={() => navigate(`${category?.alias}/${category?.id}`)}
                        className={cx({
                            active: category?.id === id,
                        })}
                        large
                    />
                ))}
            </div>
            <Outlet />
        </div>
    )
}

export default Default
