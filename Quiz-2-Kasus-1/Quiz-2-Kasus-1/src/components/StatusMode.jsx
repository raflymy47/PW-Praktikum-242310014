import { FaCircle } from "react-icons/fa";

function StatusMode({ darkMode }) {
  return (
    <div className="status-box">

      <span className={darkMode ? "badge dark-badge" : "badge light-badge"}>
        <FaCircle />

        {darkMode ? " Dark Mode" : " Light Mode"}
      </span>

    </div>
  );
}

export default StatusMode;