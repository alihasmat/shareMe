import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { fetchUser } from "./utils/fetchUser";
import Login from "./components/Login";
import Home from "./container/Home";

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = fetchUser();
    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
