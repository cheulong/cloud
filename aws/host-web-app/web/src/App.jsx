import { useState } from "react";
import "./App.css";

function App() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [symbol, setSymbol] = useState("+");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const calculateResult = () => {
    fetch(import.meta.env.VITE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        num1: parseInt(num1),
        num2: parseInt(num2),
        symbol: symbol,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Result:", data);

        setResult(data.result);
        setHistory(JSON.parse(data.history));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <h1>Calculator</h1>
      <div className="card">
        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          <p>Number 1</p>
          <input
            type="number"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
          />
          <p>Symbol</p>
          <select
            style={{ width: "100px" }}
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
          >
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">*</option>
            <option value="/">/</option>
          </select>
          <p>Number 2</p>
          <input
            type="number"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
          />
          <p>Result = {result !== null ? result : "Not calculated yet"}</p>
        </div>
      </div>
      <div className="card">
        <button onClick={calculateResult}>Calculate</button>
      </div>
      <div>
        <h2>Result History</h2>
        <ul>
          {history.Items.length > 0 &&
            history.Items.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  justifyContent: "space-around",
                }}
              >
                <p>{item["ID"].S}</p>
                <p> {item["Result"].S}</p>
              </div>
            ))}
        </ul>
      </div>
    </>
  );
}

export default App;
