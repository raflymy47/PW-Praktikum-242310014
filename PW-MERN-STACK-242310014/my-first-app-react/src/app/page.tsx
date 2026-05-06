"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [info, setInfo] = useState(null);

  const GetAPIInfo = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/info");
      setInfo(response.data);
    } catch (error) { {
      console.error("Error fetching API data:", error);
      setInfo(error?.message);
    }
}
  };

  useEffect(() => {
    GetAPIInfo();
  }, []);

  return (
    <div>
      <h1>Hello World!!</h1>
      {info && <pre>{JSON.stringify(info, null, 2)}</pre>}
    </div>
  );
}