import { Link } from "react-router-dom";

import { useGetUser } from "../../hooks/useGetUser.jsx";
import "./LoginLink.css";

export function LoginLink() {
  const { user, onLogout } = useGetUser();

  return (
    <>
      {user ? (
        <div className="loginSection">
          <p>Welcome: {user} </p>
          <button className="nav-link" onClick={onLogout}>
            Logout
          </button>
        </div>
      ) : (
        <Link className="nav-link" to="/login">
          Login
        </Link>
      )}
    </>
  );
}
