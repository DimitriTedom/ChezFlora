import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home'
import {BrowserRouter} from 'react-router-dom'
import {store} from './store/store'
import { Provider } from 'react-redux'
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <Provider store={store}>
    <Home/>
  </Provider>
  </BrowserRouter>,
)
