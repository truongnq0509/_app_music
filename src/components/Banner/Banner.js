import React from "react"
import { Link } from "react-router-dom"
import classNames from "classnames/bind"
import styles from './Banner.module.scss'
import Slider from "react-slick"

const cx = classNames.bind(styles)

const settings = {
	infinite: true,
	slidesToShow: 3,
	slidesToScroll: 1,
	autoplay: true,
	autoplaySpeed: 3000,
	arrows: false,
}

const Banner = () => {
	return (
		<Slider {...settings}>
			<div className={cx('slider')}>
				<Link>
					<img
						src="https://photo-zmp3.zmdcdn.me/banner/6/1/9/3/61938711a74c69fd86d39a2779e71756.jpg"
						alt="avatar"
						className={cx('image')}
					/>
				</Link>
			</div>
			<div className={cx('slider')}>
				<Link>
					<img
						src="https://photo-zmp3.zmdcdn.me/banner/6/1/9/3/61938711a74c69fd86d39a2779e71756.jpg"
						alt="avatar"
						className={cx('image')}
					/>
				</Link>
			</div>
			<div className={cx('slider')}>
				<Link>
					<img
						src="https://photo-zmp3.zmdcdn.me/banner/6/1/9/3/61938711a74c69fd86d39a2779e71756.jpg"
						alt="avatar"
						className={cx('image')}
					/>
				</Link>
			</div>
			<div className={cx('slider')}>
				<Link>
					<img
						src="https://photo-zmp3.zmdcdn.me/banner/6/1/9/3/61938711a74c69fd86d39a2779e71756.jpg"
						alt="avatar"
						className={cx('image')}
					/>
				</Link>
			</div>
		</Slider>
	)
}

export default Banner
