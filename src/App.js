import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom'
import { publicRoutes } from './routes';
import { Layout } from './layouts'
import { Home } from './pages/Home'
import { getHomeData } from './redux/actions';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getHomeData())
  }, [])

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
