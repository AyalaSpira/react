import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/AppLayOut";
import HomePage from "./components/homePage";
import About from "./components/toRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/home", element: <HomePage /> },
      { path: "/about", element: <About /> },
      {
        path: "/update",
        element: <div>Update Page</div>,
        children: [
          { path: ":id", element: <div>Update ID Page</div> },
        ],
      },
    ],
  },
]);
