import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout, RequireAuth } from "./components/Layout/Layout";

// Simple import
// import ListPage from "./pages/listPage";
// import Home from "./pages/home";
// import SinglePage from "./pages/singlePage";
// import UpdateProfile from "./pages/updateProfile";
// import Profile from "./pages/profile";
// import Signup from "./pages/signup";
// import Login from "./pages/login";
// import AddNewPost from "./pages/addNewPost";

// Lazy load components using React.lazy
const Home = React.lazy(() => import("./pages/home"));
const ListPage = React.lazy(() => import("./pages/listPage"));
const SinglePage = React.lazy(() => import("./pages/singlePage"));
const UpdateProfile = React.lazy(() => import("./pages/updateProfile"));
const Profile = React.lazy(() => import("./pages/profile"));
const Signup = React.lazy(() => import("./pages/signup"));
const Login = React.lazy(() => import("./pages/login"));
const AddNewPost = React.lazy(() => import("./pages/addNewPost"));

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

  //   return <RouterProvider router={router} />;
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </React.Suspense>
  );
}

export default App;
