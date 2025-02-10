import "./App.css";
import NavBar from "./components/NavBar";
import React from "react";
import Allroutes from "./routes/Allroutes";
import { BrowserRouter, Route, Router } from "react-router-dom";


function App() {
  return (
    <>


      <div className="overflow-hidden"> {/* Add this to prevent scrolling */}
        <BrowserRouter>
          <NavBar />
          <Allroutes />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
