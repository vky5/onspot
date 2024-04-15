import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import IRC from "./pages/IRC";
import Blog from "./pages/Blog";
import triangle from './assets/backgroundimg.png'
import Write from "./pages/Write";


function App() {
  const backgroundStyle = {
    backgroundImage: `url(${triangle})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  return (
    <div 
      className="bg-gradient-to-br from-blue-600 via-blue-500 to-gray-900 w-full flex flex-col items-center pb-10 z-10"
      // style={backgroundStyle}
    >
      <Navbar />
      {/* <Home /> */}
      {/* <Blog /> */}
      <Write />
      <Footer />
    </div>
  );
}

export default App;
