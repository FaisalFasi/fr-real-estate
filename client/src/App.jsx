import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import List from "./pages/list";
import Home from "./pages/home";
import SinglePage from "./pages/singlePage";
import Layout from "./components/Layout/Layout";
import Profile from "./pages/profile";
import Signup from "./pages/signup";
import Login from "./pages/login";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/list", element: <List /> },
        { path: "/:id", element: <SinglePage /> },
        { path: "/profile", element: <Profile /> },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Signup />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
