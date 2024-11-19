import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './Style/App.css';
import Navbar from './Components/Navbar';
import Home from './pages/Home';
import Room from './pages/Room';
import KhachHang from './pages/KhachHang';
import NhanVien from './pages/NhanVien';
import Booking from './pages/Booking';
import DichVu from './pages/DichVu';

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ marginLeft: "200px", padding: "0", height: "100vh", overflow: "hidden" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room" element={<Room />} />
          <Route path="/nhanvien" element={<NhanVien />} />
          <Route path="/khachhang" element={<KhachHang />} />
          <Route path="/dichvu" element={<DichVu />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
