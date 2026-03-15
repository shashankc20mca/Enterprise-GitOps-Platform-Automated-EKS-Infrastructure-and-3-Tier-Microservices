import React, { useState } from "react";

export default function RecordForm({ initial, onSave, onCancel }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [department, setDepartment] = useState(initial?.department || "");
  const [status, setStatus] = useState(initial?.status || "active");

  function submit(e) {
    e.preventDefault();
    onSave({ title, department, status });
  }

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 8, border: "1px solid #ddd", padding: 12 }}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <input value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Department" />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="active">active</option>
        <option value="inactive">inactive</option>
      </select>

      <div style={{ display: "flex", gap: 8 }}>
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
