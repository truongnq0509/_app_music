import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTitle } from './hooks';
import { useRoutes } from 'react-router-dom'
import { publicRoutes } from './routes';
import { getHomeData } from './redux/actions';

function App() {
  const dispatch = useDispatch()
  useTitle('Dev Music | Nghe tải nhạc chất lượng cao trên desktop, mobile và TV')

  useEffect(() => {
    dispatch(getHomeData())
  }, [])

  const routes = useRoutes(publicRoutes)

  return routes
}

export default App;
