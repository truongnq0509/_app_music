import HeadlessTippy from '@tippyjs/react/headless'
import classNames from 'classnames/bind'
import _ from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../../../assets/default.jpg'
import { CloseIcon, LogoIcon, MenuIcon, SearchIcon, SpinnerIcon } from '../../../components/Icons'
import { Image } from '../../../components/Image'
import { auth } from '../../../config/firebase'
import { useDebounce } from '../../../hooks'
import { setSearch } from '../../../redux/actions'
import { search as apiSearch } from '../../../services/searchService'
import { formatLink, formatNumber } from '../../../utils/fnc'
import { Sidebar } from '../Sidebar'
import styles from './Search.module.scss'

const cx = classNames.bind(styles)

const categorys = ['songs', 'artists', 'playlists']

const Search = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { search: result } = useSelector((state) => state.app)
    const [isOpenSearch, setIsOpenSearch] = useState(false)
    const [isOpenSideBar, setIsOpenSideBar] = useState(false)
    const [keywords, setKeywords] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [showResult, setShowResult] = useState(true)

    const keywordDebounce = useDebounce(keywords, 500)
    const inputRef = useRef()

    // Auth
    const [user, loading] = useAuthState(auth)

    useEffect(() => {
        if (!keywordDebounce.trim()) {
            dispatch(setSearch({}))
            return
        }

        setIsLoading(true)

        const fetchApiSearch = async () => {
            const response = await apiSearch(keywordDebounce)
            if (response?.err === 0) {
                setIsLoading(false)
                dispatch(setSearch(response?.data))
            }
        }

        fetchApiSearch()
    }, [keywordDebounce])

    const handleClear = () => {
        setKeywords('')
        dispatch(setSearch({}))
        inputRef.current.focus()
    }

    const goToSearchAll = () => {
        if (keywordDebounce.trim()) {
            navigate({
                pathname: `/tim-kiem/tat-ca`,
                search: `?q=${keywords}`,
            })
        }
    }

    const handleClick = (item) => {
        if (item?.encodeId) {
        }
        navigate(
            item?.artistsNames ? item?.album?.link?.split('.')[0] || item?.link?.split('.')[0] : formatLink(item?.link),
        )
    }

    const searchResult = (attrs) => (
        <div className={cx('result')} tabIndex="-1" {...attrs}>
            <h4 className={cx('result__title')}>Gợi ý kết quả</h4>
            <div className={cx('result__list')}>
                {categorys?.map((category) =>
                    result[category]
                        ?.filter((value, index) => index < 2)
                        ?.map((item, index) => (
                            <div key={index} className={cx('result-item')} onClick={() => handleClick(item)}>
                                <div
                                    className={cx('result-item__image', {
                                        full: item?.artistsNames,
                                    })}
                                >
                                    <Image src={item?.thumbnail} alt="avatar" />
                                </div>
                                <div className={cx('result-item__desc')}>
                                    <h5 className={cx('result-item__header')}>{item?.title || item?.name}</h5>
                                    <div className={cx('result-item__body')}>
                                        <span>
                                            {item?.totalFollow &&
                                                `Nghệ Sĩ ~ ${formatNumber(item?.totalFollow)} theo dõi`}
                                        </span>
                                        <span>
                                            {item?.album
                                                ? `${item?.artistsNames || ''}`
                                                : item?.artistsNames && `Playlist ~ ${item?.artistsNames}`}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )),
                )}
            </div>
        </div>
    )

    return (
        <div className={cx('wrapper')}>
            {/* Sidebar */}
            <div
                className={cx('sidebar', {
                    active: isOpenSideBar,
                })}
            >
                <Sidebar />
            </div>

            <Link to="/">
                <LogoIcon w="3.6rem" h="3.6rem" className={cx('logo')} />
            </Link>

            {/* Search input */}
            <div className={cx('container')}>
                <HeadlessTippy
                    visible={
                        showResult &&
                        !_.isEmpty(result) &&
                        !Object.values(result?.counter).every((value) => value === 0)
                    }
                    interactive
                    placement="bottom-start"
                    offset={[0, 10]}
                    render={searchResult}
                    onClickOutside={() => setShowResult(false)}
                >
                    <div
                        className={cx('input', {
                            active: isOpenSearch,
                        })}
                    >
                        <input
                            ref={inputRef}
                            value={keywords}
                            spellCheck={false}
                            placeholder="Search"
                            onChange={(e) => setKeywords(e.target.value)}
                            onFocus={() => setShowResult(true)}
                            onKeyUp={(e) => e.keyCode === 13 && goToSearchAll()}
                        />
                        <div className={cx('input-icon')}>
                            {isLoading ? (
                                <SpinnerIcon w="1.8rem" h="1.8rem" className={cx('input-icon__spinner')} />
                            ) : (
                                <span onClick={handleClear} style={{ display: 'flex' }}>
                                    <CloseIcon w="1.6rem" h="1.6rem" className={cx('input-icon__close')} />
                                </span>
                            )}
                            <div className={cx('line')}></div>
                            <span onClick={goToSearchAll} style={{ display: 'flex' }}>
                                <SearchIcon w="2rem" h="2rem" className={cx('input-icon__search')} />
                            </span>
                        </div>
                    </div>
                </HeadlessTippy>
                <div>
                    <img src={!user ? avatar : user.photoURL} alt="avatar" className={cx('avatar')} />
                </div>
            </div>

            <div className={cx('icons')}>
                <span
                    onClick={() => {
                        setIsOpenSearch((prev) => !prev)
                        setIsOpenSideBar(false)
                    }}
                >
                    <SearchIcon w="2.2rem" h="2.2rem" className={cx('icons__search')} />
                </span>
                <span
                    onClick={() => {
                        setIsOpenSideBar((prev) => !prev)
                        setIsOpenSearch(false)
                    }}
                >
                    {isOpenSideBar ? (
                        <CloseIcon w="2.4rem" h="2.4rem" className={cx('icons__close')} />
                    ) : (
                        <MenuIcon w="2.4rem" h="2.4rem" className={cx('icons__menu')} />
                    )}
                </span>
            </div>
        </div>
    )
}

export default Search
