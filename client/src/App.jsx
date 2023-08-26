import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Fav from "./pages/Fav";
import AdminDashboard from "./pages/AdminDashboard";
import { useAppContext } from "./context/appContext";
function App() {
  const { getCoins, isAdmin } = useAppContext();
  useEffect(() => {
    getCoins();
  }, [isAdmin]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/favorites" element={<Fav />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
