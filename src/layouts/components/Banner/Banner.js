import React from "react"
import PropTypes from 'prop-types';
import { Link } from "react-router-dom"
import classNames from "classnames/bind"
import styles from './Banner.module.scss'
import Slider from "react-slick"
import { Skeleton } from "@mui/material";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md'

const cx = classNames.bind(styles)

const Banner = ({ banner, isLoading = true }) => {

	const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
		<MdOutlineKeyboardArrowLeft
			{...props}
			className={
				"slick-prev slick-arrow" +
				(currentSlide === 0 ? " slick-disabled" : "")
			}
			aria-hidden="true"
			aria-disabled={currentSlide === 0 ? true : false}
			size={26}
		/>
	)

	const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
		<MdOutlineKeyboardArrowRight
			{...props}
			className={
				"slick-next slick-arrow" +
				(currentSlide === slideCount - 1 ? " slick-disabled" : "")
			}
			aria-hidden="true"
			aria-disabled={currentSlide === slideCount - 1 ? true : false}
			size={26}
		/>
	)

	const settings = {
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		arrows: true,
		nextArrow: <SlickArrowLeft w="2.8rem" h='2.8rem' />,
		prevArrow: <SlickArrowRight w="2.8rem" h='2.8rem' />,
		responsive: [
			{
				breakpoint: 1600,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 1224,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 740,
				settings: {
					slidesToShow: 1,
				},
			},
		]
	}

	// filter banner type
	// banner = banner.filter(item => (item.type === 1 || item.type === 4))

	return (
		<div className={cx('slider')}>
			<Slider {...settings}>
				{isLoading && Array(4).fill(0).map((item, index) => (
					<div key={index}>
						<Link >
							<Skeleton variant="rounded" sx={{ paddingBottom: '50%', width: '100%', height: '0' }} />
						</Link>
					</div>
				))}

				{banner.map(item => (
					<div key={item?.encodeId}>
						<Link to={item?.link?.split('.')[0]} >
							{isLoading ? <Skeleton variant="rounded" sx={{ paddingBottom: '50%', width: '100%', height: '0' }} /> : (
								<img
									src={item?.banner}
									alt="banner"
									className={cx('image')}
								/>
							)}
						</Link>
					</div>
				))}
			</Slider>
		</div>
	)
}

Banner.propTypes = {
	banner: PropTypes.array.isRequired,
	isLoading: PropTypes.bool
}

export default Banner
