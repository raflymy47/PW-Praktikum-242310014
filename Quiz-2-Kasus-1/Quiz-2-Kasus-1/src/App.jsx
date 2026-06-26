import { useState } from "react";
import Clock from "./components/Clock";
import ThemeToggle from "./components/ThemeToggle";
import StatusMode from "./components/StatusMode";

import {
  FaUserGraduate,
  FaIdCard,
  FaUniversity,
} from "react-icons/fa";

import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "container dark" : "container"}>

      <div className="background-circle circle1"></div>
      <div className="background-circle circle2"></div>

      <div className="card">

        <h1 className="title">
          🕒 Digital Clock
        </h1>

        <p className="subtitle">
          React Real-Time Clock with Dark Mode
        </p>

        <Clock />

        <ThemeToggle
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <StatusMode darkMode={darkMode} />

        <div className="divider"></div>

        <div className="identity">

          <h2>Quiz 2 Kasus 1</h2>

          <div className="info">

            <div className="info-item">
              <FaUserGraduate />
              <div>
                <span>Nama</span>
                <strong>Rafly Maulana Yusuf</strong>
              </div>
            </div>

            <div className="info-item">
              <FaIdCard />
              <div>
                <span>NPM</span>
                <strong>242310014</strong>
              </div>
            </div>

            <div className="info-item">
              <FaUniversity />
              <div>
                <span>Kelas</span>
                <strong>TI-24-KA</strong>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default App;