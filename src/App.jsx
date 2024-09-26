import { useEffect, useState } from 'react'
import authService from './appwrite/auth'
import {useDispatch} from 'react-redux'
import { login, logout } from './store/authSlice'
import './App.css'
import { Outlet } from 'react-router-dom'
import { Footer, Header } from './components'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
         <Outlet />
        <Footer />
      </div>
    </div>
  ) : null 
}

export default App
