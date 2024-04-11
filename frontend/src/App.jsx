import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-gradient-to-br from-blue-500 via-blue-400 to-gray-800 w-full h-screen flex flex-col items-center">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
