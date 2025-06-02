import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { FiTrash } from "react-icons/fi";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const token = localStorage.getItem("token");

  const fetchTodos = useCallback(async () => {
    try {
      const res = await axios.get("https://todo-mern-be.onrender.com/api/todos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(res.data);
    } catch (err) {
      console.error("Failed to fetch todos:", err.message);
    }
  }, [token]);

  const addTodo = async () => {
    if (!text.trim()) return;
    try {
      await axios.post(
        "https://todo-mern-be.onrender.com/api/todos",
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setText("");
      fetchTodos();
    } catch (err) {
      console.error("Failed to add todo:", err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://todo-mern-be.onrender.com/api/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTodos();
    } catch (err) {
      console.error("Failed to delete todo:", err.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <>
      <Navbar />
      <div className="p-4 max-w-xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-700">
          📝 My Todo List
        </h2>

        <div className="flex gap-2 mb-6">
          <input
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Add a new task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            onClick={addTodo}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
          >
            Add
          </button>
        </div>

        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="flex items-center justify-between border p-3 rounded bg-white shadow-sm hover:shadow-md transition"
            >
              <span className="text-lg text-gray-800">{todo.text}</span>
              <button onClick={() => deleteTodo(todo._id)} title="Delete">
                <FiTrash className="text-red-500 hover:text-red-700 text-xl" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
