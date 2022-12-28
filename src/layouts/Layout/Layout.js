import React from "react"
import classNames from 'classnames/bind'
import { Link, Outlet } from "react-router-dom"
import styles from './Layout.module.scss'
import { Sidebar } from "../../components/Sidebar"
import { Player } from '../../components/Player'
import { LogoIcon } from "../../components/Icons"
import { Search } from "../../components/Search"


const cx = classNames.bind(styles)

const Layout = () => {
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
			{/* <Player /> */}
		</div>
	)
}

export default Layout
