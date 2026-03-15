import React, { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { getToken, clearToken } from "./api";

export default function App() {
  const [view, setView] = useState(getToken() ? "dashboard" : "login");

  function logout() {
    clearToken();
    setView("login");
  }

  return (
    <div style={{ fontFamily: "Arial", padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <h2>3-Tier MERN App (Auth + CRUD)</h2>

      <div style={{ marginBottom: 16 }}>
        {view !== "dashboard" ? (
          <>
            <button onClick={() => setView("login")} style={{ marginRight: 8 }}>Login</button>
            <button onClick={() => setView("register")}>Register</button>
          </>
        ) : (
          <button onClick={logout}>Logout</button>
        )}
      </div>

      {view === "login" && <Login onSuccess={() => setView("dashboard")} />}
      {view === "register" && <Register onSuccess={() => setView("login")} />}
      {view === "dashboard" && <Dashboard />}
    </div>
  );
}
