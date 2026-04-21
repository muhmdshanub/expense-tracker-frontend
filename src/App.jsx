import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/api/test")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Error connecting to backend"));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Expense Tracker</h1>
      <p>Backend Response: {message}</p>
    </div>
  );
}

export default App;