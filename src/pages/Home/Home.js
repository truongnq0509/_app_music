import React from 'react'
import { useSelector } from 'react-redux'
import { useOutletContext } from 'react-router'
import { Banner } from '../../layouts/components/Banner'
import { Sections, SectionsSkeleton } from '../../components/Sections'
import NewRelease from './NewRelease'

const Home = () => {
    const [isLoading] = useOutletContext()
    const { banner, hArtistTheme, hAutoTheme1, hAutoTheme2, top100, hXone, hAlbum } = useSelector((state) => state.app)

    return (
        <>
            <Banner banner={banner} isLoading={isLoading} />
            {isLoading ? (
                <>
                    <SectionsSkeleton limit={1} />
                    <NewRelease isPage isLoading={true} />
                    <SectionsSkeleton limit={6} />
                </>
            ) : (
                <>
                    <Sections data={hArtistTheme} hasTitleArtist limit={6} />

                    <NewRelease isPage isLoading={false} />

                    <Sections data={top100} hasTitleArtist limit={6} />

                    <Sections data={hAlbum} hasTitleSong limit={6} />

                    <Sections data={hAutoTheme1} hasTitleSong />

                    <Sections data={hAutoTheme2} hasTitleArtist />

                    <Sections data={hXone} hasTitleSong />
                </>
            )}
        </>
    )
}

export default Home
