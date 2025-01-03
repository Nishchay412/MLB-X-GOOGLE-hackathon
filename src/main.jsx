import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import App from './App.jsx'
import { SignUp } from '../signup';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {path:"/signup",
  element : <SignUp/>


}
]);

// Render the router
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);