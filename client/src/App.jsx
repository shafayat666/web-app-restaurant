import './App.css'
import Footer from './components/Footer'
import NavBar from './components/NavBar'
import AppRoutes from './routes/AppRoutes'

function App() {

  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar />
      <main className='flex-1'>
        <AppRoutes />
      </main>
      <Footer />
    </div>
  )
}

export default App
