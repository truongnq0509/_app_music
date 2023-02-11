import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import classNames from 'classnames/bind'
import styles from './MV.module.scss'
import Tippy from '@tippyjs/react/headless'
import { Sections, SectionsSkeleton } from '../../components/Sections'
import { listMV as apiListMV, categoryMV as apiCategoryMV } from '../../services/musicService'
import { MdOutlineKeyboardArrowLeft, MdOutlineLibraryMusic } from 'react-icons/md'

const cx = classNames.bind(styles)

const MV = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    // State
    const [isLoading, setIsLoading] = useState(true)
    const [listMV, setListMV] = useState([])
    const [categorys, setCategorys] = useState([])
    const [title, setTitle] = useState('Tất Cả')
    const [visible, setVisible] = useState(false)

    const show = () => setVisible(true)
    const hide = () => setVisible(false)

    useEffect(() => {
        const fetchApiListMV = async () => {
            setIsLoading(true)
            const [videos, categorys] = await Promise.all([apiListMV(id, 1, 50), apiCategoryMV(id)])

            if (videos?.err === 0) {
                setIsLoading(false)
                setListMV(videos?.data?.items)
            }

            if (categorys?.err === 0) {
                setIsLoading(false)
                setCategorys(categorys?.data?.childs)
            }
        }
        fetchApiListMV()
    }, [id])

    return (
        <div className={cx('list')}>
            <div>
                <Tippy
                    visible={visible}
                    interactive
                    offset={[0, 10]}
                    render={(attrs) => (
                        <div className={cx('category')} tabIndex="-1" {...attrs}>
                            {categorys?.map((item, index) => (
                                <span
                                    key={index}
                                    className={cx('item')}
                                    onClick={() => {
                                        setVisible(false)
                                        setTitle(item?.name)
                                        navigate(`${item?.link?.split('.')?.[0]}`)
                                    }}
                                >
                                    {item?.name}
                                </span>
                            ))}
                        </div>
                    )}
                    placement="bottom-start"
                    onClickOutside={hide}
                >
                    <button className={cx('btn')} onClick={visible ? hide : show}>
                        <span className={cx('btn-music')}>
                            <MdOutlineLibraryMusic size={18} />
                        </span>
                        <span>{title}</span>
                        <span
                            className={cx('btn-arrow', {
                                turn: visible,
                            })}
                        >
                            <MdOutlineKeyboardArrowLeft size={20} />
                        </span>
                    </button>
                </Tippy>
            </div>
            {isLoading ? (
                <SectionsSkeleton limit={6} isVideo />
            ) : (
                <Sections
                    data={{
                        items: listMV,
                    }}
                    isVideo
                    hasTitleArtist
                />
            )}
        </div>
    )
}

export default MV
