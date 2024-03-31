import React from "react";
import List from "./pages/list";
import Home from "./pages/home";
import SinglePage from "./pages/singlePage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Profile from "./pages/profile";

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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
