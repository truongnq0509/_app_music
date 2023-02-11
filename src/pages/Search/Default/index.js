import React, { useState } from 'react'
import { Outlet } from 'react-router'
import { useNavigate, useLocation } from 'react-router'
import { useTitle } from '../../../hooks'
import classNames from 'classnames/bind'
import styles from '../Search.module.scss'
import { Button } from '../../../components/Button'

const cx = classNames.bind(styles)
const categorys = [
    { title: 'Tất Cả', link: 'tat-ca', key: null },
    { title: 'Bài Hát', link: 'bai-hat', key: 'songs' },
    { title: 'Playlist/Album', link: 'album', key: 'playlists' },
    { title: 'Nghệ Sĩ/OA', link: 'artist', key: 'artists' },
    { title: 'MV', link: 'video', key: 'videos' },
]

const Default = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [active, setActive] = useState(null)

    useTitle('Dev Music | Nghe tải nhạc chất lượng cao trên desktop, mobile và TV')

    return (
        <div className={cx('wrapper')}>
            <div
                className={cx('header', {
                    'm-0': active,
                })}
            >
                <div className={cx('category')}>
                    {categorys.map((category, index) => (
                        <Button
                            key={index}
                            title={category.title}
                            large
                            className={cx({
                                active: category.key === active,
                            })}
                            handleClick={() => {
                                setActive(category.key)
                                navigate(`${category.link + location?.search}`)
                            }}
                        />
                    ))}
                </div>
            </div>
            <Outlet context={[active, categorys]} />
        </div>
    )
}

export default Default
