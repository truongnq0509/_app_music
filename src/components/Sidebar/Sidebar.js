import React from "react"
import classNames from "classnames/bind"
import styles from './Sidebar.module.scss'
import { NavLink } from "react-router-dom"
import { HomeIcon, PlaylistIcon, VideoIcon, RadioIcon, LogoutIcon, UserIcon } from "../Icons"

const cx = classNames.bind(styles)

const menu = [
	{ title: 'Home', to: '/', icon: <HomeIcon className={cx('icon')} /> },
	{ title: 'My collections', to: '/playlist', icon: <PlaylistIcon className={cx('icon')} /> },
	{ title: 'Radio', to: '/radio', icon: <RadioIcon className={cx('icon')} /> },
	{ title: 'Music Videos', to: '/video', icon: <VideoIcon className={cx('icon')} /> },
	{ title: 'Profile', to: '/profile', icon: <UserIcon className={cx('icon')} /> },
	{ title: 'Log out', to: '/logout', icon: <LogoutIcon className={cx('icon')} /> }
]

const Sidebar = () => {
	return (
		<div className={cx('nav')}>
			{menu.map((item, index) => (
				<NavLink key={index} to={item.to} className={({ isActive }) => cx('nav-item', {
					'active': isActive
				})}>
					{item.icon}
					<span className={cx('title')}>{item.title}</span>
				</NavLink>
			))}
		</div>
	)
}

export default Sidebar
