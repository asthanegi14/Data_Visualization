import React, { useState, useEffect } from "react"; 
import axios from "axios";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "components/Layout";
import Dashboard from "components/Dashboard";

function App() {
  const [chartData, setChartData] = useState([]);
  const backend_Url = process.env.REACT_APP_backend_Url || "http://localhost:8000";

  useEffect(() => {
    axios.get(`${backend_Url}/chart`)
      .then(response => {
        setChartData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);
  
  return (
    <div className="app">
      <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard chartData={chartData}/>} />
            </Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;