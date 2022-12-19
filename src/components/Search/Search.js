import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import { SearchIcon, CloseIcon, MenuIcon, LogoIcon } from "../Icons";
import { Sidebar } from "../Sidebar";

const cx = classNames.bind(styles)

const Search = () => {
	const [isOpenSearch, setIsOpenSearch] = useState(false)
	const [isOpenSideBar, setIsOpenSideBar] = useState(false)

	return (
		<div className={cx('wrapper')}>
			{/* Sidebar */}
			<div className={cx('sidebar', {
				'active': isOpenSideBar
			})}>
				<Sidebar />
			</div>

			<Link to="/">
				<LogoIcon w='3.6rem' h='3.6rem' className={cx('logo')} />
			</Link>

			<div className={cx('input', {
				'active': isOpenSearch
			})}>
				<input
					type='text'
					placeholder="Search"
				/>
				<div className={cx('input-icon')}>
					<CloseIcon w='1.6rem' h='1.6rem' className={cx('input-icon__close')} />
					<div className={cx('line')}></div>
					<SearchIcon w='2rem' h='2rem' className={cx('input-icon__search')} />
				</div>
			</div>

			<div className={cx('icons')}>
				<span
					onClick={() => {
						setIsOpenSearch(prev => !prev)
						setIsOpenSideBar(false)
					}}
				>
					<SearchIcon w='2.2rem' h='2.2rem' className={cx('icons__search')} />
				</span>
				<span
					onClick={() => {
						setIsOpenSideBar(prev => !prev)
						setIsOpenSearch(false)
					}}
				>

					{isOpenSideBar ? <CloseIcon w='2.4rem' h='2.4rem' className={cx('icons__close')} /> : <MenuIcon w='2.4rem' h='2.4rem' className={cx('icons__menu')} />}
				</span>
			</div>
		</div>
	);
};

export default Search;
