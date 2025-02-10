import { Outlet } from 'react-router'
import './App.css'
import NavBar from './pages/shared/NavBar'
import Footer from './pages/shared/Footer'


function App() {

  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar />
      <main className='flex-1'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
