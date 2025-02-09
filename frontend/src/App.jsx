import "./App.css";
import NavBar from "./components/NavBar";
import React from "react";
import Allroutes from "./routes/Allroutes";
import { BrowserRouter, Route, Router } from "react-router-dom";


function App() {
  return (
    <>
     
      <BrowserRouter>
      <NavBar />
        <Allroutes />
      </BrowserRouter>
    </>
  );
}

export default App;
