import React, { useContext } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import "./App.css";
import { UserContext, UserProvider } from "./context/UserContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import Profile from "./components/Profile";
import TopBar from "./components/topbar/Topbar";
import LeftBar from "./components/leftbar/Leftbar";
import Rightbar from "./components/rightbar/Rightbar";

function App() {
  const Layout = () => {
    return (
      <div className="layout">
        <TopBar />
        <div className="Leftbar" style={{ display: "flex" }}>
          <LeftBar />

          <div style={{ flex: 8 }}>
            <Outlet />
          </div>

          <Rightbar />
        </div>
      </div>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <div className="App">
      <UserProvider>
        {/* <React.StrictMode> */}
        <RouterProvider router={router} />
        {/* </React.StrictMode> */}
      </UserProvider>
    </div>
  );
}

export default App;