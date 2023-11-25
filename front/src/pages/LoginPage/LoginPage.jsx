import { useRef } from "react";
import { useState } from "react";
import { useContext } from "react";
import BasePage from "../BasePage";
import "./LoginPage.css";

import { ErrorContext } from "../../main";

export default function LoginPage() {
  const loginFormRef = useRef(null);
  const { setError } = useContext(ErrorContext);
  const [isSignUpActive, setIsSignUpActive] = useState(true);

  const containerStyle = {
    left: isSignUpActive ? "50%" : "0",
  };

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
  const SignInForm = () => {
    return (
      <form ref={loginFormRef} action="/api/login/password" method="post">
        <h1>Sign In</h1>
        <div className="social-icons"></div>
        <span>Use your User Name & password</span>
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="username"
          name="username"
        />
        <input
          type="password"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
          name="password"
        />
        <button type="submit">Sign In</button>
      </form>
    );
  };
  const SignUpForm = () => {
    const handleSignUp = () => {
      setIsSignUpActive(true);
      onSignUp();
    };

    return (
      <form ref={loginFormRef} action="/api/login/password" method="post">
        <h1>Create Account</h1>
        <div className="social-icons"></div>
        <span>use User name for registration</span>
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="username"
          name="username"
        />
        <input
          type="password"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
          name="password"
        />
        <button type="button" onClick={handleSignUp}>
          Sign Up
        </button>
      </form>
    );
  };

  // Toggle container component
  const ToggleContainer = () => {
    return (
      <div
        className="toggle-container"
        style={{ left: isSignUpActive ? "50%" : "0" }}
      >
        <div className="toggle">
          <div
            className={`toggle-panel toggle-left ${
              !isSignUpActive ? "active" : ""
            }`}
          >
            <h1>Welcome Back!</h1>
            <p>
              Don't have an account, click on the "Sign Up" button.
              <br /> Have an account already? Click on the "Sign In" button.
            </p>
          </div>
          <div className="toggle-buttons">
            <button
              className={!isSignUpActive ? "active" : ""}
              onClick={() => setIsSignUpActive(false)}
            >
              Sign In
            </button>
            <button
              className={isSignUpActive ? "active" : ""}
              onClick={() => setIsSignUpActive(true)}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <BasePage>
      <ToggleContainer />
      <div className="container" id="container" style={containerStyle}>
        <div className="wrapper">
          <div
            className={`form-container ${
              isSignUpActive ? "sign-up" : "sign-in"
            }`}
          >
            {isSignUpActive ? null : <SignInForm />}
            {isSignUpActive ? <SignUpForm /> : null}
          </div>
        </div>
      </div>
    </BasePage>
  );
}

/*
import { useRef } from "react";

import { useContext } from "react";
import BasePage from "../BasePage";

import { ErrorContext } from "../../main";

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
*/

/*
<div
        className="toggle-container"
        style={{ left: isSignUpActive ? "50%" : "0" }}
      >
        <div className="toggle">
          <div
            className={`toggle-panel toggle-left ${
              !isSignUpActive ? "active" : ""
            }`}
          >
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of the site features</p>
            <button
              className="hidden"
              id="login"
              onClick={() => setIsSignUpActive(false)}
            >
              Sign In
            </button>
          </div>
          <div
            className={`toggle-panel toggle-right ${
              isSignUpActive ? "active" : ""
            }`}
          >
            <h1>Hello!</h1>
            <p>
              Register with your personal details to use all of the site
              features
            </p>
            <button
              className="hidden"
              id="register"
              onClick={() => setIsSignUpActive(true)}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
*/
