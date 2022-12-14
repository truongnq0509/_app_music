import config from '../config'

// Pages
import { Home } from '../pages/Home'
import { Playlist } from '../pages/Playlist'
import { MV } from '../pages/MV'

// publicRoutes

const publicRoutes = [
	{ path: config.routes.home, page: Home },
	{ path: config.routes.playlist, page: Playlist },
	{ path: config.routes.video, page: MV }
	// { path: config.routes.radio, },
]

const privateRoutes = [

]

export { publicRoutes, privateRoutes }