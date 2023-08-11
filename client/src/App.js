import React, { useState, useEffect } from "react"; 
import axios from "axios";
import { CssBaseline, ThemeProvider } from "@mui/material";
// import { createTheme } from "@mui/material/styles";
// import { useMemo } from "react";
// import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import { themeSettings } from "theme";
import Layout from "components/Layout";
import Dashboard from "components/Dashboard";

function App() {
  // const mode = useSelector((state) => state.global.mode);
  // const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Fetch data from your backend API
    axios.get("http://localhost:5001/chart")
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
        {/* <ThemeProvider theme={theme}> */}
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard chartData={chartData}/>} />
            </Route>
          </Routes>
        {/* </ThemeProvider> */}
      </BrowserRouter>
    </div>
  );
}

export default App;