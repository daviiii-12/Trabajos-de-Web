import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import CobradorDashboard from "./pages/CobradorDashboard.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/cobrador" element={<CobradorDashboard />} />
      <Route path="*" element={<div style={{ padding: 24 }}>404 - No existe</div>} />
    </Routes>
  );
}
