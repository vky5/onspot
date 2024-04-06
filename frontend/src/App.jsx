import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

function App() {

  return (
    <div className='bg-gradient-to-br from-blue-900 to-purple-600 h-screen flex flex-col items-center'>
      <Navbar />
      <Home/>
      <Footer />
    </div>
  )
}

export default App
