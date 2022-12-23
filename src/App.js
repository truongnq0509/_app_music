import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTitle } from './hooks';
import { Routes, Route } from 'react-router-dom'
import { publicRoutes } from './routes';
import { Layout } from './layouts'
import { Home } from './pages/Home'
import { getHomeData } from './redux/actions';

function App() {
  const dispatch = useDispatch()
  useTitle('Dev Music | Nghe tải nhạc chất lượng cao trên desktop, mobile và TV')

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
