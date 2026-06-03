import { useEffect, useState } from "react";
import axios from "axios";

const columns = ["todo", "progress", "done"];

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title) return;
    await axios.post("http://localhost:5000/tasks", {
      title,
      status: "todo",
    });
    setTitle("");
    fetchTasks();
  };

  const moveTask = async (id, status) => {
    await axios.put(`http://localhost:5000/tasks/${id}`, { status });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div className="container">
      <h1>MERN Kanban Board</h1>

      <div className="topbar">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New Task"
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div className="board">
        {columns.map((col) => (
          <div className="column" key={col}>
            <h2>{col.toUpperCase()}</h2>

            {tasks
              .filter((t) => t.status === col)
              .map((task) => (
                <div className="card" key={task._id}>
                  <p>{task.title}</p>

                  <div className="actions">
                    {col !== "todo" && (
                      <button onClick={() => moveTask(task._id, "todo")}>
                        Todo
                      </button>
                    )}

                    {col !== "progress" && (
                      <button onClick={() => moveTask(task._id, "progress")}>
                        Progress
                      </button>
                    )}

                    {col !== "done" && (
                      <button onClick={() => moveTask(task._id, "done")}>
                        Done
                      </button>
                    )}

                    <button onClick={() => deleteTask(task._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}