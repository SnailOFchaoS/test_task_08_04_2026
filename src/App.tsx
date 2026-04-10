import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { Provider } from 'react-redux'

import './App.css'
import { MainPage, EnterPage } from './pages'
import { store } from './store'

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/enter' element={<EnterPage />} />
        </Routes>

      </BrowserRouter>
    </Provider>
  )
}

export default App
