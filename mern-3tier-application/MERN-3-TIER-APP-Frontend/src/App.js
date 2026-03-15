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

  const isDashboard = view === "dashboard";

  const styles = {
    page: {
      minHeight: "100vh",
      background:
        "radial-gradient(1200px 600px at 20% 10%, rgba(99,102,241,.18), transparent 60%)," +
        "radial-gradient(900px 500px at 80% 0%, rgba(16,185,129,.14), transparent 55%)," +
        "linear-gradient(180deg, #0b1220 0%, #0a0f1a 100%)",
      color: "#e5e7eb",
      padding: 24,
      boxSizing: "border-box",
    },
    shell: {
      maxWidth: 980,
      margin: "0 auto",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      marginBottom: 16,
    },
    brand: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      userSelect: "none",
    },
    logo: {
      width: 40,
      height: 40,
      borderRadius: 12,
      background:
        "linear-gradient(135deg, rgba(99,102,241,.9) 0%, rgba(16,185,129,.9) 100%)",
      boxShadow: "0 10px 30px rgba(0,0,0,.35)",
      display: "grid",
      placeItems: "center",
      fontWeight: 800,
      color: "#0b1220",
    },
    titleWrap: { lineHeight: 1.15 },
    title: {
      margin: 0,
      fontSize: 18,
      fontWeight: 800,
      letterSpacing: 0.2,
      color: "#f9fafb",
    },
    subtitle: {
      margin: "4px 0 0 0",
      fontSize: 13,
      color: "rgba(229,231,235,.75)",
    },

    pill: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "8px 10px",
      borderRadius: 999,
      border: "1px solid rgba(255,255,255,.12)",
      background: "rgba(255,255,255,.06)",
      backdropFilter: "blur(8px)",
      fontSize: 12,
      color: "rgba(229,231,235,.85)",
    },
    dot: (ok) => ({
      width: 8,
      height: 8,
      borderRadius: 999,
      background: ok ? "rgba(16,185,129,1)" : "rgba(239,68,68,1)",
      boxShadow: ok
        ? "0 0 0 4px rgba(16,185,129,.18)"
        : "0 0 0 4px rgba(239,68,68,.18)",
    }),

    card: {
      borderRadius: 18,
      border: "1px solid rgba(255,255,255,.12)",
      background: "rgba(17,24,39,.55)",
      boxShadow: "0 20px 60px rgba(0,0,0,.45)",
      overflow: "hidden",
    },
    cardTop: {
      padding: "14px 16px",
      borderBottom: "1px solid rgba(255,255,255,.10)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      background:
        "linear-gradient(180deg, rgba(255,255,255,.06) 0%, rgba(255,255,255,.02) 100%)",
    },
    tabs: {
      display: "flex",
      gap: 8,
      alignItems: "center",
      flexWrap: "wrap",
    },
    tabBtn: (active) => ({
      border: "1px solid rgba(255,255,255,.14)",
      background: active ? "rgba(99,102,241,.22)" : "rgba(255,255,255,.06)",
      color: active ? "#f9fafb" : "rgba(229,231,235,.9)",
      padding: "8px 12px",
      borderRadius: 12,
      cursor: "pointer",
      fontSize: 13,
      fontWeight: 700,
      letterSpacing: 0.2,
      outline: "none",
      transition: "transform .08s ease, background .15s ease",
    }),
    btnPrimary: {
      border: "1px solid rgba(99,102,241,.45)",
      background: "rgba(99,102,241,.28)",
      color: "#f9fafb",
      padding: "8px 12px",
      borderRadius: 12,
      cursor: "pointer",
      fontSize: 13,
      fontWeight: 800,
      outline: "none",
    },
    btnDanger: {
      border: "1px solid rgba(239,68,68,.45)",
      background: "rgba(239,68,68,.18)",
      color: "#f9fafb",
      padding: "8px 12px",
      borderRadius: 12,
      cursor: "pointer",
      fontSize: 13,
      fontWeight: 800,
      outline: "none",
    },

    body: {
      padding: 16,
    },
    hint: {
      marginTop: 10,
      fontSize: 12,
      color: "rgba(229,231,235,.7)",
      display: "flex",
      gap: 10,
      flexWrap: "wrap",
      alignItems: "center",
    },
    badge: {
      border: "1px solid rgba(255,255,255,.14)",
      background: "rgba(255,255,255,.06)",
      borderRadius: 999,
      padding: "6px 10px",
    },
    footer: {
      marginTop: 14,
      fontSize: 12,
      color: "rgba(229,231,235,.55)",
      display: "flex",
      justifyContent: "space-between",
      gap: 10,
      flexWrap: "wrap",
    },
    linkish: {
      color: "rgba(229,231,235,.8)",
      textDecoration: "underline",
      textUnderlineOffset: 3,
      cursor: "default",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.shell}>
        {/* Top header */}
        <div style={styles.header}>
          <div style={styles.brand}>
            <div style={styles.logo}>M</div>
            <div style={styles.titleWrap}>
              <h2 style={styles.title}>3-Tier MERN App tuffy2018</h2>
              <p style={styles.subtitle}>Auth + CRUD • Frontend ↔ Backend ↔ MongoDB tuffy2018 </p>
            </div>
          </div>

          <div style={styles.pill} title="Session status">
            <span style={styles.dot(!!getToken())} />
            <span>{getToken() ? "Signed in" : "Signed out"}</span>
            <span style={{ opacity: 0.7 }}>•</span>
            <span style={{ opacity: 0.9 }}>
              {isDashboard ? "Dashboard" : view === "login" ? "Login" : "Register"}
            </span>
          </div>
        </div>

        {/* Main card */}
        <div style={styles.card}>
          <div style={styles.cardTop}>
            {!isDashboard ? (
              <div style={styles.tabs}>
                <button
                  onClick={() => setView("login")}
                  style={styles.tabBtn(view === "login")}
                >
                  Login
                </button>
                <button
                  onClick={() => setView("register")}
                  style={styles.tabBtn(view === "register")}
                >
                  Register
                </button>
              </div>
            ) : (
              <div style={styles.tabs}>
                <span style={styles.badge}>Welcome back</span>
                <span style={styles.badge}>You’re in the dashboard</span>
              </div>
            )}

            {isDashboard ? (
              <button onClick={logout} style={styles.btnDanger}>
                Logout
              </button>
            ) : (
              <button
                onClick={() => setView(getToken() ? "dashboard" : "login")}
                style={styles.btnPrimary}
                title="Go to login"
              >
                {getToken() ? "Go to Dashboard" : "Continue"}
              </button>
            )}
          </div>

          <div style={styles.body}>
            {view === "login" && <Login onSuccess={() => setView("dashboard")} />}
            {view === "register" && <Register onSuccess={() => setView("login")} />}
            {view === "dashboard" && <Dashboard />}

            <div style={styles.hint}>
              <span style={styles.badge}>
                API URL: <span style={{ opacity: 0.9 }}>{process.env.REACT_APP_API_URL}</span>
              </span>
              <span style={styles.badge}>
                Tip: if API fails, check DevTools → Network from tuffy2018
              </span>
            </div>

            <div style={styles.footer}>
              <span>
                Status:{" "}
                <span style={styles.linkish}>
                  {isDashboard ? "Authenticated" : "Not authenticated"}
                </span>
              </span>
              <span style={{ opacity: 0.7 }}>© {new Date().getFullYear()} MERN 3-Tier</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
