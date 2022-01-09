import { Route, Routes } from "react-router-dom"
import Home from "./Components/Home";
import Register from "./Components/Register";
import Login from "./Components/Login"
import axios from "axios"

axios.defaults.headers.post["Content-Type"] = 'application/json; charset=utf-8'
// axios.defaults.baseURL = "http://localhost:5000"
axios.defaults.baseURL = process.env.REACT_APP_BASE_URI

function App() {
  return (
    <div className="App text-white">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
