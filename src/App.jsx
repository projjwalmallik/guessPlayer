import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Play from "./Pages/Play";
import Home from "./Pages/Home";

function App() {
  const [data, setData] = useState(null);
  const [stats, setStats] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("http://localhost:3000/stats/", {
        params: { token: data }, // Directly pass the data object as params
      })
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const streak = stats?.streak;
  return (
    <BrowserRouter>
      <NavBar streak={streak} />
      <Routes>
        <Route path="/" element={<Home />}>
          {" "}
        </Route>
        <Route path="/play" element={<Play stats={stats} />}>
          {" "}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
