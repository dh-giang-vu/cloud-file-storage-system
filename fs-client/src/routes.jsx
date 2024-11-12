import { Navigate } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import FileManager from "./pages/FileManager";
import PrivateRoute from "./security/PrivateRoute";


const routes = [
  {
    path: "/",
    element: <PrivateRoute element={<FileManager />} />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
]


export default routes;