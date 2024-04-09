import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-gradient-to-tr from-teal-800 to-teal-900 w-full h-screen flex flex-col items-center">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
