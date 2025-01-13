import './App.css'
import AppLayout from './components/AppLayOut'
import HomePage from './components/homePage'
import DrawerAppBar from './components/navBar'
import { BrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { router } from './router'
const App=() =>{

  return (
   <>

   <RouterProvider router={router} />

   </>
  )
}

export default App
