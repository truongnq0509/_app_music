import classNames from 'classnames/bind'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LogoIcon } from '../../components/Icons'
import { Player } from '../components/Player'
import { Search } from '../components/Search'
import { Sidebar } from '../components/Sidebar'
import styles from './Layout.module.scss'
import { useSelector } from 'react-redux'
const cx = classNames.bind(styles)

const Layout = () => {
    const { curSongId } = useSelector((state) => state.music)

    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidebar')}>
                <Link to="/" className={cx('logo')}>
                    <LogoIcon w="5.2rem" h="5.2rem" />
                </Link>

                <div className={cx('nav')}>
                    <Sidebar />
                </div>
            </div>
            <div className={cx('content')}>
                <Search />
                <Outlet />
            </div>
            {curSongId && <Player />}
            <ToastContainer />
        </div>
    )
}

export default Layout
