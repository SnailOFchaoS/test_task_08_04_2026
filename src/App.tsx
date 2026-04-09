import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { Provider } from 'react-redux'

import './App.css'
import { MainPage } from './pages'
import { store } from './store'

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
        </Routes>

      </BrowserRouter>
    </Provider>
  )
}

export default App
