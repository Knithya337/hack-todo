import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Todo() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail") || "user@example.com";

  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    due_date: "",
    status: "Open",
  });
  const [editingTaskId, setEditingTaskId] = useState(null);
useEffect(() => {
  if (!userEmail) {
    navigate("/");
  }
}, [navigate, userEmail]);


  const fetchTasks = () => {
    fetch("http://localhost/react-auth-backend/get_tasks.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setTasks(data.tasks);
        else alert("Failed to fetch tasks");
      })
      .catch((err) => console.error("Fetch tasks error:", err));
  };

useEffect(() => {
  fetchTasks();
}, []);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = editingTaskId
      ? "http://localhost/react-auth-backend/update_task.php"
      : "http://localhost/react-auth-backend/create_task.php";

    const payload = { ...form, user_email: userEmail };
    if (editingTaskId) payload.id = editingTaskId;

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        if (data.success) {
          setForm({ title: "", description: "", due_date: "", status: "Open" });
          setEditingTaskId(null);
          fetchTasks();
        }
      });
  };

  const handleEdit = (task) => {
    setForm({
      title: task.title,
      description: task.description,
      due_date: task.due_date,
      status: task.status,
    });
    setEditingTaskId(task.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const markComplete = (task) => {
    fetch("http://localhost/react-auth-backend/update_task.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: task.id,
        user_email: userEmail,
        title: task.title,
        description: task.description,
        due_date: task.due_date,
        status: task.status === "Open" ? "Complete" : "Open",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        if (data.success) fetchTasks();
      });
  };

  const deleteTask = (taskId) => {
    if (!window.confirm("Are you sure to delete this task?")) return;
    fetch("http://localhost/react-auth-backend/delete_task.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: taskId, user_email: userEmail }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        if (data.success) fetchTasks();
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  return (
    <div style={{ maxWidth: 800, margin: "30px auto", fontFamily: "Segoe UI, sans-serif", padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ color: "#333" }}>{editingTaskId ? "Edit Task" : "Add New Task"}</h2>
        <button
          onClick={handleLogout}
          style={{
            background: "#dc3545",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "8px 16px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ background: "#f4f6f8", padding: 20, borderRadius: 10, boxShadow: "0 2px 6px rgba(0,0,0,0.1)", marginTop: 10 }}>
        <input
          name="title"
          placeholder="Task Title"
          value={form.title}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 6, border: "1px solid #ccc", fontSize: 16 }}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 6, border: "1px solid #ccc", fontSize: 16 }}
        />
        <input
          type="date"
          name="due_date"
          value={form.due_date}
          onChange={handleChange}
          style={{ padding: 10, borderRadius: 6, border: "1px solid #ccc", width: "100%", fontSize: 16 }}
        />
        <div style={{ marginTop: 20 }}>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              background: editingTaskId ? "#17a2b8" : "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              fontSize: 16,
              cursor: "pointer",
              marginRight: 10,
            }}
          >
            {editingTaskId ? "Update Task" : "Add Task"}
          </button>
          {editingTaskId && (
            <button
              type="button"
              onClick={() => {
                setEditingTaskId(null);
                setForm({ title: "", description: "", due_date: "", status: "Open" });
              }}
              style={{
                padding: "10px 20px",
                background: "#6c757d",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h3 style={{ marginTop: 40, color: "#444" }}>Your Tasks</h3>
      {tasks.length === 0 ? (
        <p>No tasks found. Start by adding one!</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, marginTop: 20 }}>
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{
                padding: 20,
                marginBottom: 15,
                borderRadius: 10,
                background: task.status === "Complete" ? "#e6f9e8" : "#fffbe6",
                border: `1px solid ${task.status === "Complete" ? "#b4e1bb" : "#ffe8a1"}`,
                boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                transition: "all 0.3s ease",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h4 style={{ margin: 0 }}>{task.title}</h4>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: task.status === "Complete" ? "#2e7d32" : "#b77c00",
                      background: task.status === "Complete" ? "#c8e6c9" : "#fff3cd",
                      padding: "4px 10px",
                      borderRadius: 6,
                      marginRight: 10,
                      display: "inline-block",
                    }}
                  >
                    {task.status}
                  </span>
                  <p style={{ fontSize: 14, color: "#666" }}>
                    Due: <strong>{task.due_date || "N/A"}</strong>
                  </p>
                  {task.description && <p style={{ fontSize: 15 }}>{task.description}</p>}
                </div>
                <div>
                  <button
                    onClick={() => markComplete(task)}
                    style={{
                      marginRight: 8,
                      padding: "8px 12px",
                      background: task.status === "Open" ? "#28a745" : "#ffc107",
                      border: "none",
                      borderRadius: 6,
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    {task.status === "Open" ? "Complete" : "Reopen"}
                  </button>
                  <button
                    onClick={() => handleEdit(task)}
                    style={{
                      marginRight: 8,
                      padding: "8px 12px",
                      background: "#007bff",
                      border: "none",
                      borderRadius: 6,
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    style={{
                      padding: "8px 12px",
                      background: "#dc3545",
                      border: "none",
                      borderRadius: 6,
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Todo;
