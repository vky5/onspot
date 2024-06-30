// necessary imports
import React, { createContext, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// imports of dependencies
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from "react-router-dom";

// Importing components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import BlogTemp from "./pages/BlogTemp";
import Liked from "./pages/Liked";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { getCookie } from "./utils/Cookies";

// this context is for light mode / dark mode
export const ModeContext = createContext();

// this context is to check if the user is logged in or not
export const LoggedInContext = createContext();

// defining different routes in frontend
const paths = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/blogs",
    element: <Blogs />,
  },
  {
    path: "/blogs/:id",
    element: <BlogTemp />,
  },
  {
    path: "/liked",
    element: <Liked />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/login",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
];

const AppComponent = () => {
  // to track user is on which page
  const location = useLocation();

  // Define routes where Navbar and Footer should not appear
  const excludedRoutes = ["/login", "/signup"];

  // Check if the current route is excluded
  const isExcludedRoute = excludedRoutes.includes(location.pathname);

  // creating state of mode to pass in the ModeContext to track whether light mode is on or dark mode
  const [mode, setMode] = useState("dark");

  // this is to check if the user is logged in or not and this is done by tracking if the cookie is passed in the page or not.
  const [isLoggedin, setLoggedin] = useState(false);

  // this useEffect is to track whether user is logged in or not.
  useEffect(() => {
    const checkLoggedIn = () => {
      if (getCookie("jwt")) {
        setLoggedin(true);
      } else {
        setLoggedin(false);
      }
    };

    checkLoggedIn;
  }, []);

  const toggleMode = () => {
    setMode((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div>
      <LoggedInContext.Provider value={{ isLoggedin, setLoggedin }}>
        <ModeContext.Provider value={{ mode, toggleMode }}>
          {!isExcludedRoute && <Navbar />}
          <Outlet />
          {!isExcludedRoute && <Footer />}
        </ModeContext.Provider>
      </LoggedInContext.Provider>
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppComponent />,
    children: paths,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={appRouter} />
  </React.StrictMode>
);
