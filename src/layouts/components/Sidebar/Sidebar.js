import React from 'react'
import classNames from 'classnames/bind'
import styles from './Sidebar.module.scss'
import { NavLink } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../config/firebase'
import { signOut } from 'firebase/auth'
import {
    HomeIcon,
    PlaylistIcon,
    VideoIcon,
    RadioIcon,
    LogoutIcon,
    UserIcon,
    LoginIcon,
} from '../../../components/Icons'

const cx = classNames.bind(styles)

const Sidebar = () => {
    const [user, loading] = useAuthState(auth)

    const menu = [
        { title: 'Home', to: '/', icon: <HomeIcon className={cx('icon')} /> },
        { title: 'My Collections', to: '/mymusic', icon: <PlaylistIcon className={cx('icon')} /> },
        { title: 'Radio', to: '/radio', icon: <RadioIcon className={cx('icon')} /> },
        { title: 'Music Videos', to: '/the-loai-video', icon: <VideoIcon className={cx('icon')} /> },
        // { title: 'Profile', to: '/profile', icon: <UserIcon className={cx('icon')} /> },
        {
            title: user ? 'Sign Out' : 'Sign In',
            to: '/login',
            icon: user ? <LogoutIcon className={cx('icon', 'turn')} /> : <LoginIcon className={cx('icon')} />,
        },
    ]

    return (
        <div className={cx('nav')}>
            {menu
                .filter((item) => (user ? true : item.to !== '/mymusic'))
                .map((nav, index) => (
                    <NavLink
                        key={index}
                        to={nav.to}
                        className={({ isActive }) =>
                            cx('nav-item', {
                                active: isActive,
                            })
                        }
                        onClick={async () => {
                            if (nav.to == '/login') await signOut(auth)
                        }}
                    >
                        {nav.icon}
                        <span className={cx('title')}>{nav.title}</span>
                    </NavLink>
                ))}
        </div>
    )
}

export default Sidebar
