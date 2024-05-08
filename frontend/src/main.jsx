import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {
  createBrowserRouter, 
  RouterProvider, 
  Outlet,
  useLocation
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import BlogTemp from './pages/BlogTemp';
import Liked from './pages/Liked';
import About from './pages/About';
import Profile from './pages/Profile';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

const paths = [
  {
    path: '/',
    element: (
      <Home />
    )
  },
  {
    path: '/blogs',
    element: (
      <Blogs />
    )
  },
  {
    path: '/blogs/:id',
    element: (
      <BlogTemp />
    )
  },
  {
    path: '/liked',
    element: (
      <Liked />
    )
  },
  {
    path: '/about',
    element: (
      <About />
    )
  },
  {
    path: '/profile',
    element: (
      <Profile />
    )
  },
  {
    path: '/login',
    element: (
      <Signin />
    )
  },
  {
    path: '/signup',
    element: (
      <Signup />
    )
  }
];

const AppComponent = () => {
  const location = useLocation();
  
  // Define routes where Navbar and Footer should not appear
  const excludedRoutes = ['/login', '/signup'];
  
  // Check if the current route is excluded
  const isExcludedRoute = excludedRoutes.includes(location.pathname);
  
  return (
    <div>
      {!isExcludedRoute && <Navbar />}
      <Outlet />
      {!isExcludedRoute && <Footer />}
    </div>
  );
};

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
);
