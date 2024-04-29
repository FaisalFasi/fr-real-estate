import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout, RequireAuth } from "./components/Layout/Layout";
import ListPage from "./pages/listPage";
import Home from "./pages/home";
import SinglePage from "./pages/singlePage";
import UpdateProfile from "./pages/updateProfile";
import Profile from "./pages/profile";
import Signup from "./pages/signup";
import Login from "./pages/login";
import AddNewPost from "./pages/addNewPost";

import {
  listPageLoader,
  profilePageLoader,
  singlePageLoader,
} from "./lib/loaders";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/list", element: <ListPage />, loader: listPageLoader },
        { path: "/:id", element: <SinglePage />, loader: singlePageLoader },

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
        { path: "/profile", element: <Profile />, loader: profilePageLoader },
        {
          path: "/profile/update",
          element: <UpdateProfile />,
        },
        {
          path: "/add",
          element: <AddNewPost />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
