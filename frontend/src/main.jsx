import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import IRC from "./pages/IRC";
import Blog from "./pages/Blog";
import triangle from './assets/backgroundimg.png'
import Write from "./pages/Write";

import {
  RouterProvider,
  createBrowserRouter,
  Outlet

} from "react-router-dom"
 
const Structure = () => {

  const backgroundStyle = {
    backgroundImage: `url(${triangle})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };


  return (
    <div 
        className="" 
        // style={backgroundStyle}
    >
      <Navbar />
      <Outlet />  
      <Footer />
    </div>
  )
}


const router = createBrowserRouter([
  {
    path: '/',
    element: <Structure />,
    children: [
      {
        path: "/",
        element: <Home/>
      },{
        path: "/blogs/:blogId",
        element: <Blog/>
      },{
        path: "/write",
        element: <Write/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
