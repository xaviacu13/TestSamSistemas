import react from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import { Title, Register, Home } from "./components";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route
              path="title"
              element={
                <Title title="Welcome to Samsistemas test" subTitle="By Xavi" />
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
