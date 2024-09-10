import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import Dashboard from "../components/dashboard/Dashboard";
import PublishStory from "../components/dashboard/PublishStory";
import AllStories from "../pages/AllStories/AllStories";
import SingleStory from "../pages/SingleStory/SingleStory";
import Register from "../pages/Register/Register";
import ViewAllUsers from "../components/dashboard/ViewAllUsers";
import MyStoryList from "../components/dashboard/MyStoryList";
import StoryAnalytics from "../components/dashboard/StoryAnalytics";
import ViewAllStories from "../components/dashboard/ViewAllStories";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-story",
        element: (
          <ProtectedRoute allowedRoles={["reader", "author", "admin"]}>
            <AllStories />
          </ProtectedRoute>
        ),
      },
      {
        path: "/story/:storyId",
        element: (
          <ProtectedRoute allowedRoles={["reader", "author", "admin"]}>
            <SingleStory />
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
    ],
  },
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["author", "admin"]}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/admin/dashboard/home",
        element: <Dashboard />,
      },

      {
        path: "/admin/dashboard/publish-story",
        element: <PublishStory />,
      },
      {
        path: "/admin/dashboard/view-users",
        element: <ViewAllUsers />,
      },
      {
        path: "/admin/dashboard/my-story",
        element: <MyStoryList />,
      },
      {
        path: "/admin/dashboard/all-stories",
        element: <ViewAllStories />,
      },
      {
        path: "/admin/dashboard/story-analytics",
        element: <StoryAnalytics />,
      },
    ],
  },
]);

export default router;
