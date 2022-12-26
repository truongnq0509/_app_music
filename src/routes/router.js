import config from '../config'

// Pages
import { Home } from '../pages/Home'
import { Playlist } from '../pages/Playlist'
import { MV } from '../pages/MV'
import { Album } from '../pages/Album'
import { Artist } from '../pages/Artist'
import { Top100 } from '../pages/Top100'

// publicRoutes

const publicRoutes = [
	{ path: config.routes.home, page: Home },
	{ path: config.routes.playlist, page: Playlist },
	{ path: config.routes.video, page: MV },
	{ path: config.routes.album, page: Album },
	{ path: config.routes.artist, page: Artist },
	{ path: config.routes.top100, page: Top100 },
]

const privateRoutes = [

]

export { publicRoutes, privateRoutes }