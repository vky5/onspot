import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter, 
  RouterProvider, 
  Outlet
} from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Blogs from './pages/Blogs'
import BlogTemp from './pages/BlogTemp'
import Liked from './pages/Liked'
import About from './pages/About';
import Profile from './pages/Profile'
import Footer from './components/Footer'
import Signin from './pages/Signin';
import Signup from './pages/Signup';

const paths = [
  {
    path: '/',
    element: (
      <Home />
    )
  },{
    path: '/blogs',
    element: (
      <Blogs />
    )
  },{
    path: '/blogs/:id',
    element: (
      <BlogTemp />
    )
  },{
    path: '/liked',
    element: (
      <Liked />
    )
  },{
    path: '/about',
    element: (
      <About />
    )
  },{
    path: '/profile',
    element: (
      <Profile />
    )
  },{
    path: '/login',
    element: (
      <Signin />
    )
  },{
    path: '/signup',
    element: (
      <Signup />
    )
  }
]

const AppComponent = ()=>{
  return (
    <div>
      <Navbar />
      <Outlet/>
      <Footer />
    </div>
  )
}

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppComponent />,
    children: paths
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={appRouter}/>
  </React.StrictMode>,
)
