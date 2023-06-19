import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Layout from "./components/Layout";
import { useSelector } from "react-redux";

function App() {
  let isAuth = useSelector((state) => state.user.isLoggedIn );
  isAuth = isAuth ? isAuth : "";
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={isAuth ? <Layout /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
