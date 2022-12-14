import { Routes, Route } from 'react-router-dom'
import { publicRoutes } from './routes';
import { Layout } from './layouts'
import { Home } from './pages/Home'

function App() {
  return (
    <Routes>
      {publicRoutes.map((route, index) => {
        let Page = route.page

        return <Route key={index} path={route.path} element={<Layout><Page /></Layout>}></Route>
      })}
      <Route path='*' element={<Layout><Home /></Layout>}></Route>
    </Routes >
  )
}

export default App;
