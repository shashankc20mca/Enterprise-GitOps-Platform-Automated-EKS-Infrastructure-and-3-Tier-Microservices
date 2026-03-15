import React, { useEffect, useState } from "react";
import { api } from "../api";
import RecordForm from "./RecordForm";

export default function Dashboard() {
  const [records, setRecords] = useState([]);
  const [msg, setMsg] = useState("");
  const [editing, setEditing] = useState(null); // record or null
  const [creating, setCreating] = useState(false);

  async function load() {
    setMsg("");
    try {
      const data = await api.listRecords();
      setRecords(Array.isArray(data) ? data : []);
    } catch (err) {
      setMsg(err.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function create(body) {
    try {
      await api.createRecord(body);
      setCreating(false);
      await load();
    } catch (err) {
      setMsg(err.message);
    }
  }

  async function update(id, body) {
    try {
      await api.updateRecord(id, body);
      setEditing(null);
      await load();
    } catch (err) {
      setMsg(err.message);
    }
  }

  async function remove(id) {
    if (!window.confirm("Delete this record?")) return;
    try {
      await api.deleteRecord(id);
      await load();
    } catch (err) {
      setMsg(err.message);
    }
  }

  return (
    <div>
      <h3>Dashboard (CRUD)</h3>
      {msg && <p style={{ color: "red" }}>{msg}</p>}

      {!creating && !editing && (
        <button onClick={() => setCreating(true)} style={{ marginBottom: 12 }}>
          + New Record
        </button>
      )}

      {creating && (
        <RecordForm
          onSave={create}
          onCancel={() => setCreating(false)}
        />
      )}

      {editing && (
        <RecordForm
          initial={editing}
          onSave={(body) => update(editing._id, body)}
          onCancel={() => setEditing(null)}
        />
      )}

      <table border="1" cellPadding="8" style={{ width: "100%", marginTop: 12, borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Department</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r._id}>
              <td>{r.title}</td>
              <td>{r.department}</td>
              <td>{r.status}</td>
              <td>
                <button onClick={() => setEditing(r)} style={{ marginRight: 8 }}>Edit</button>
                <button onClick={() => remove(r._id)}>Delete</button>
              </td>
            </tr>
          ))}
          {records.length === 0 && (
            <tr><td colSpan="4" align="center">No records yet</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
