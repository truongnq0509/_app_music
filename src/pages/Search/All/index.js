import React from 'react'
import { useSelector } from 'react-redux'
import { useOutletContext } from 'react-router'
import { Sections } from '../../../components/Sections'

const All = () => {
    const [active, categorys] = useOutletContext()
    const { search: result } = useSelector((state) => state.app)

    return (
        <>
            <Sections
                data={{
                    items: result[active],
                    title: categorys.find((category) => category.key === active).title,
                }}
                isVideo={active === 'videos'}
                isArtist={active === 'artists'}
                hasTitleArtist
            />
        </>
    )
}

export default All
