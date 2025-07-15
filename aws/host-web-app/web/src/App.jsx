import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [symbol, setSymbol] = useState(0);
  const [result, setResult] = useState(null);

  const calculateResult = () => {
    fetch("https://ev9tkniko9.execute-api.ap-southeast-1.amazonaws.com/dev", {
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
        setResult(data.result);
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
    </>
  );
}

export default App;
