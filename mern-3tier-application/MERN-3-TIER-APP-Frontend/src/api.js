const API_BASE = process.env.REACT_APP_API_URL ?? "";

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function clearToken() {
  localStorage.removeItem("token");
}

async function request(path, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

export const api = {
  register: (body) => request("/api/auth/register", { method: "POST", body: JSON.stringify(body) }),
  login: (body) => request("/api/auth/login", { method: "POST", body: JSON.stringify(body) }),
  listRecords: () => request("/api/records", { method: "GET" }),
  createRecord: (body) => request("/api/records", { method: "POST", body: JSON.stringify(body) }),
  updateRecord: (id, body) => request(`/api/records/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  deleteRecord: (id) => request(`/api/records/${id}`, { method: "DELETE" })
};
