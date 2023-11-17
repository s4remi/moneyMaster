import { useRef } from "react";

import { useContext } from "react";
import BasePage from "./BasePage";

import { ErrorContext } from "../main";

export default function LoginPage() {
  const loginFormRef = useRef(null);
  const { setError } = useContext(ErrorContext);

  async function onSignUp() {
    const formData = new FormData(loginFormRef.current);
    console.log("👏🏻 Signup formData", formData);

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(Object.fromEntries(formData.entries())),
    });
    if (!res.ok) {
      console.log("Signup failed", res);

      const data = await res.json();
      setError({ msg: "Signup failed: " + data.msg, type: "danger" });
      return;
    }

    console.log("👏🏻 Signup success", res);
    setError({ msg: "Signup success, please log in", type: "success" });
  }

  return (
    <BasePage>
      <div className="form-signin w-100 m-auto">
        <form ref={loginFormRef} action="/api/login/password" method="post">
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="username"
              name="username"
            />
            <label htmlFor="floatingInput">Username</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              name="password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="mb-2">
            <button className="btn btn-primary w-50 py-2" type="submit">
              Sign in
            </button>
            <button
              className="btn btn-secondary w-50 py-2"
              type="button"
              onClick={onSignUp}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </BasePage>
  );
}
