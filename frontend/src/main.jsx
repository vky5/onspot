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
  useNavigate,
} from "react-router-dom";
import { vkyreq } from "./utils/vkyreq";
import { deleteCookie, getCookie, setCookie } from "./utils/Cookies";
import { useParams } from "react-router-dom";

// Importing components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import BlogTemp from "./pages/BlogTemp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Branch from "./pages/Branch";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import ProtectedComponent from "./pages/frontend/src/components/ProtectedRoutes";
import Comment from './components/Blogs/Comment'
// Analytics and speed insights
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

// this context is for light mode / dark mode
export const ModeContext = createContext();

// this context is to check if the user is logged in or not
export const LoggedInContext = createContext();

// this context is for basic user info like his name email profile and username...
export const UserContext = createContext();


// extra components
const BlogComponent = () => {
  const { id } = useParams(); // Extract the id from the URL

  return (
    <>
      <BlogTemp />
      <Comment id={id} />
    </>
  );
};



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
    element: <BlogComponent />
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/profile",
    element: (
      <ProtectedComponent>
        <Profile />
      </ProtectedComponent>
    ),
  },
  {
    path: "/profile/settings",

    element: (
      <ProtectedComponent>
        <Settings />
      </ProtectedComponent>
    ),
  },
  {
    path: "/users/:id",
    element: (
      <ProtectedComponent>
        <Users />
      </ProtectedComponent>
    ),
  },
  {
    path: "/login",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/branch",
    element: (
      <ProtectedComponent>
        <Branch />
      </ProtectedComponent>
    ),
  },
  {
    path: "/branch/:id",
    element: (
      <ProtectedComponent>
        <Branch />
      </ProtectedComponent>
    ),
  },
];

const AppComponent = () => {
  // to track user is on which page
  const location = useLocation();
  const navigate = useNavigate();
  // Define routes where Navbar and Footer should not appear
  const excludedRoutes = ["/login", "/signup"];

  // Check if the current route is excluded
  const isExcludedRoute = excludedRoutes.includes(location.pathname);

  // creating state of mode to pass in the ModeContext to track whether light mode is on or dark mode
  const [mode, setMode] = useState("dark");

  // this is to check if the user is logged in or not and this is done by tracking if the cookie is passed in the page or not.
  const [isLoggedin, setLoggedin] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    img: "",
    username: "",
    about: "",
    _id: "",
  });

  // this useEffect is to track whether user is logged in or not.
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        if (getCookie("jwt")) {
          setLoggedin(true);
          // if the user exists get their data from backend and update it in useState
          const res = await vkyreq("get", "/users/me");
          setUserData(res.data.data);
        } else {
          setLoggedin(false);
        }

        if (getCookie("theme")) {
          setMode(getCookie("theme"));
        } else {
          setMode("dark");
          setCookie("theme", mode);
        }
      } catch (error) {
        setLoggedin(false);
        deleteCookie("jwt");
        navigate("/");
      }
    };

    checkLoggedIn();
  }, []);

  const toggleMode = () => {
    setMode((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    setCookie("theme", mode);
  };

  return (
    <div>
      <UserContext.Provider value={{ userData, setUserData }}>
        <LoggedInContext.Provider value={{ isLoggedin, setLoggedin }}>
          <ModeContext.Provider value={{ mode, toggleMode }}>
            {!isExcludedRoute && <Navbar />}
            <Outlet />
            {!isExcludedRoute && <Footer />}
          </ModeContext.Provider>
        </LoggedInContext.Provider>
      </UserContext.Provider>
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
    <SpeedInsights />
    <Analytics />
    <RouterProvider router={appRouter} />
  </React.StrictMode>
);

