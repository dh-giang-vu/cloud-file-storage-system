import { useAuth } from "../security/AuthContext";

function FileManager() {

  const { logout } = useAuth();

  return (
  <div>
    <h1>File Manager Page</h1>
    <button onClick={logout}>Log Out</button>
  </div>);
}

export default FileManager;