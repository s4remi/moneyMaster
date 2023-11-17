import React, { useState, createContext } from "react";
import ReactDOM from "react-dom/client";
import PhotosPage from "./pages/DatasPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PhotosPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export const ErrorContext = createContext(null);

function RootComponent() {
  const [error, setError] = useState({
    type: "danger",
    msg: "",
  });

  return (
    <React.StrictMode>
      <ErrorContext.Provider value={{ setError, error }}>
        <RouterProvider router={router} />
      </ErrorContext.Provider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<RootComponent />);
