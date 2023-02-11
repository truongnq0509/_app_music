import config from '../config'

// Pages
import { Layout } from '../layouts'
import { Album } from '../pages/Album'
import { Home, Top100, NewRelease, Default as HomeDefault } from '../pages/Home'
import { Artist, All as ArtistAll, Default as ArtistDefault } from '../pages/Artist'
import { Search, All as SearchAll, Default as SearchDefault } from '../pages/Search'
import { MV, Default as MVDefault } from '../pages/MV'
import { Video } from '../pages/Video'
import { Auth } from '../pages/Auth'
import { MyMusic, Default as MyMusicDefault } from '../pages/MyMusic'
import { NotFound } from '../pages/NotFound'

const routes = [
    {
        element: <Layout />,
        children: [
            {
                path: config.routes.home,
                element: <HomeDefault />,
                children: [
                    { path: '', element: <Home /> },
                    { path: 'new-release', element: <NewRelease /> },
                    { path: 'top100', element: <Top100 /> },
                ],
            },
            {
                path: config.routes.artist,
                element: <ArtistDefault />,
                children: [
                    { path: '', element: <Artist /> },
                    { path: ':type', element: <ArtistAll /> },
                ],
            },
            {
                path: config.routes.search,
                element: <SearchDefault />,
                children: [
                    { path: 'tat-ca', element: <Search /> },
                    { path: ':category', element: <SearchAll /> },
                ],
            },
            {
                path: config.routes.mv,
                element: <MVDefault />,
                children: [{ path: ':category/:id', element: <MV /> }],
            },
            {
                path: config.routes.video,
                element: <Video />,
            },
            {
                path: config.routes.album,
                element: <Album />,
            },
            {
                path: config.routes.myMusic,
                element: <MyMusicDefault />,
                children: [{ path: ':type', element: <MyMusic /> }],
            },
            {
                path: config.routes.radio,
                element: <NotFound />,
            },
            {
                path: config.routes.notFound,
                element: <NotFound />,
            },
        ],
    },
    {
        path: config.routes.register,
        element: <Auth />,
    },
    {
        path: config.routes.login,
        element: <Auth />,
    },
]

export { routes }
