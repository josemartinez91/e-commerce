import { useState } from 'react'
import './App.css'
import './styles/layout.css'
import{HashRouter, Routes, Route} from 'react-router-dom'
import {Home, Login, ProductDetail, Purchases, SignUp } from './pages'
import {NavBar, LoadingScreen, ProtectedRoutes} from './components'
import {useSelector} from 'react-redux'
import Footer from './components/Footer'



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
          <Route path='/signup' element={<SignUp/>}/>
          <Route element={<ProtectedRoutes/>}>
            <Route path='purchases' element={<Purchases/>}/>
          </Route>
          
        </Routes>
        <Footer/>
      </HashRouter>
    </div>
  )
}

export default App
