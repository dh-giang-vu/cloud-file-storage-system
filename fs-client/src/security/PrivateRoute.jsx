import { Navigate } from 'react-router-dom';
import { useAuth } from "./AuthContext";

export default function PrivateRoute({ element }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return element;
}
