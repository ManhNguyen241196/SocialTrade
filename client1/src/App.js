import React, { useContext, useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import News from "./pages/News/News";

import "./App.css";
import { PostProvider } from "./context/PostContext";
import { UserContext, UserProvider } from "./context/UserContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import Profile from "./pages/Profile/Profile";
import TopBar from "./components/topbar/Topbar";
import LeftBar from "./components/leftbar/Leftbar";
import Rightbar from "./components/rightbar/Rightbar";
import Chat from "./pages/Home/Chat/Chat";
import ListFollower from "./pages/ListFollower/ListFollower";
import ListFollowing from "./pages/ListFollowing/ListFollowing";
import Noti from "./pages/Notification/Noti";
import AllPosts from "./pages/AllPosts/AllPosts";
import { SocketProvider } from "./context/SocketContext";
import { CountMessProvider } from "./context/CountMess";
import { CountNotiProvider } from "./context/CountNotiContext";
import { SymbolProvider } from "./components/rightbar/context/AllSymbolContext";
import { WatchListProvider } from "./components/rightbar/context/WatchListSymbolContext";

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
          path: "profile/:userId",
          element: <Profile />,
        },
        {
          path: "news",
          element: <News />,
        },
        {
          path: "listFollower",
          element: <ListFollower />,
        },
        {
          path: "listFollowing",
          element: <ListFollowing />,
        },
        {
          path: "notification",
          element: <Noti />,
        },
        {
          path: "allPosts",
          element: <AllPosts />,
        },
        {
          path: "chat",
          element: <Chat />,
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
    // {
    //   path: "/chat",
    //   element: <Chat />,
    // },
  ]);

  return (
    <div className="App">
      <UserProvider>
        <SocketProvider>
          <PostProvider>
            <CountNotiProvider>
              <CountMessProvider>
                {/* chart rightbar */}
                <SymbolProvider>
                  <WatchListProvider>
                    {/* <React.StrictMode> */}
                    <RouterProvider router={router} />
                    {/* </React.StrictMode> */}
                  </WatchListProvider>
                </SymbolProvider>
              </CountMessProvider>
            </CountNotiProvider>
          </PostProvider>
        </SocketProvider>
      </UserProvider>
    </div>
  );
}

export default App;
