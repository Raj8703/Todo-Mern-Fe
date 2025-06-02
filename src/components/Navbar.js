import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi"; // Make sure to install react-icons

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md flex justify-between items-center">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-semibold">My To-Do List</h1>
      </div>
      <button
        onClick={logout}
        className="flex items-center gap-1 bg-red-500 hover:bg-red-600 transition-colors px-4 py-2 rounded-md shadow"
      >
        <FiLogOut className="text-lg" />
        Logout
      </button>
    </nav>
  );
}
