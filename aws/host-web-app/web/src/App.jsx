import { useEffect, useState } from "react";
import { secret } from '@aws-amplify/backend';

import "./App.css";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

// Initialize DynamoDB client
const dynamoDBClient = new DynamoDBClient({
  region: "ap-southeast-1", // Replace with your desired AWS region
  credentials: {
    accessKeyId: secret('VITE_AWS_ACCESS_KEY_ID'),
    secretAccessKey: secret('VITE_AWS_SECRET_ACCESS_KEY'),
  },
});

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
        getItem();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    getItem();
  }, []);
  const getItem = async () => {
    const input = {
      TableName: "CalculatorDB",
    };
    const data = await dynamoDBClient.send(new ScanCommand(input));
    setHistory(data.Items);
    console.log("Success - item retrieved", data);
    return data.Items;
  };
  console.log({ history });

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
          {history.length > 0 &&
            history.map((item, index) => (
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
