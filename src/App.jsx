import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Bets from "./Bets";
import Home from "./Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bets" element={<Bets />} />
      </Routes>
    </BrowserRouter>
  );
}
