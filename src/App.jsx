import { useState } from 'react'
import './App.css'
import{HashRouter, Routes, Route} from 'react-router-dom'
import {Home, Login, ProductDetail, Purchases} from './pages'
import {NavBar, LoadingScreen} from './components'
import {useSelector} from 'react-redux'

function App() {
  const [count, setCount] = useState(0)

  const isLoading = useSelector(state => state.isLoading)

  return (
    <div className="App">
      
      <HashRouter>
      <NavBar/>
      {isLoading && <LoadingScreen/>}
      
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/product/:id' element={<ProductDetail/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='purchases' element={<Purchases/>}/>
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
