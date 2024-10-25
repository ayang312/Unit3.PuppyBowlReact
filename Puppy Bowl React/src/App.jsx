import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import AllPlayers from "./components/AllPlayers";
import "./App.css";
import SinglePlayer from "./components/SinglePlayer";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllPlayers />} />
        <Route path='/players/:id' element={<SinglePlayer />} />
      </Routes>
    </BrowserRouter>
  );  
}
