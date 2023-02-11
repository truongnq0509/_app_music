import React, { useState, useEffect } from 'react'
import { useTitle } from '../../../hooks'
import { Sections, SectionsSkeleton } from '../../../components/Sections'
import { top100 as apiTop100 } from '../../../services/musicService'

const Top100 = () => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    // Set title
    useTitle('Top 100 | Tuyển tập nhạc hay chọn lọc')

    useEffect(() => {
        const fetchTop100 = async () => {
            const response = await apiTop100()

            if (response?.err === 0) {
                setData(response?.data)
                setIsLoading(false)
            }
        }
        fetchTop100()
    }, [])

    return (
        <>
            {isLoading && <SectionsSkeleton limit={6} />}
            {data?.map((item, index) => (
                <Sections key={index} data={item} hasTitleArtist noPadding />
            ))}
        </>
    )
}

export default Top100
