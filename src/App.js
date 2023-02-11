import { useRoutes } from 'react-router-dom'
import { routes as publicRouter } from './routes'

function App() {
    const routes = useRoutes(publicRouter)
    return routes
}

export default App
