import { FaMoon, FaSun } from "react-icons/fa";

function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      className="toggle-btn"
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? <FaSun /> : <FaMoon />}

      {darkMode ? " Light Mode" : " Dark Mode"}
    </button>
  );
}

export default ThemeToggle;