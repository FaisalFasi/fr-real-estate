import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import List from "./pages/list";
import Home from "./pages/home";
import SinglePage from "./pages/singlePage";
import { Layout, RequireAuth } from "./components/Layout/Layout";
import UpdateProfile from "./pages/updateProfile";
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
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        { path: "/profile", element: <Profile /> },
        {
          path: "/profile/update",
          element: <UpdateProfile />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
