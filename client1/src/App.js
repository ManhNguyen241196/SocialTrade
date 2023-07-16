import React, { useContext } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import "./App.css";
import { UserContext, UserProvider } from "./context/UserContext";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
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
