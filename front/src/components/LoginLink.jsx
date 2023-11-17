import { Link } from "react-router-dom";

import { useGetUser } from "../hooks/useGetUser";

export function LoginLink() {
  const { user, onLogout } = useGetUser();

  return (
    <>
      {user ? (
        <div>
          Welcome {user}{" "}
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
