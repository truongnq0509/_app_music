import config from '../config'

// Pages
import { Layout } from '../layouts'
import { Home } from '../pages/Home'
import { List } from '../pages/List'
import { MV } from '../pages/MV'
import { Album } from '../pages/Album'
import { Artist, All, Default } from '../pages/Artist'
import { Top100 } from '../pages/Top100'

// publicRoutes

const publicRoutes = [
	{
		element: <Layout />,
		children: [
			{
				path: config.routes.home,
				element: <Home />
			},
			{
				path: config.routes.playlist,
				element: <List />
			},
			{
				path: config.routes.video,
				element: <MV />
			},
			{
				path: config.routes.album,
				element: <Album />
			},
			{
				path: config.routes.artist,
				element: <Default />,
				children: [
					{ path: "", element: <Artist /> },
					{ path: ":type", element: <All /> },
				]
			},
			{
				path: config.routes.top100,
				element: <Top100 />
			},
		]
	}
]


export { publicRoutes }