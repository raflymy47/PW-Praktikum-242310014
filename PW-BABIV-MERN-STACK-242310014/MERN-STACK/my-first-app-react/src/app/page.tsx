"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [info, setInfo] = useState<any>(null);

  const getAPIInfo = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/info");
      setInfo(response.data);
    } catch (error: any) {
      console.error("Error fetching API data:", error);
      setInfo(error.message);
    }
  };

  useEffect(() => {
    getAPIInfo();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Hello World!!</h1>

      {info && (
     <pre
  style={{
    backgroundColor: "#1e1e1e",
    color: "#00ff99",
    padding: "15px",
    borderRadius: "8px",
    margin: 0,
    whiteSpace: "pre-wrap",
  }}
>
  {JSON.stringify(info, null, 2)}
</pre>
      )}
    </div>
  );
}