import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import { SearchIcon, CloseIcon } from "../Icons";

const cx = classNames.bind(styles)

const Search = () => {


	return (
		<div className={cx('wrapper')}>
			<div className={cx('search')}>
				<input
					type='text'
					placeholder="Search"
				/>
				<SearchIcon w='2.4rem' h='2.4rem' className={cx('icon')} />
				<CloseIcon w='1.6rem' h='1.6rem' className={cx('close')} />
			</div>

		</div>
	);
};

export default Search;
