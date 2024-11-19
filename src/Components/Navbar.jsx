import React from "react";
import { Link } from "react-router-dom";
import "../Style/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/room">Phòng</Link>
      <Link to="/nhanvien">Nhân Viên</Link>
      <Link to="/khachhang">Khách Hàng</Link>
      <Link to="/dichvu">Dịch Vụ</Link>
      <Link to="/booking">Booking</Link>
    </nav>
  );
};

export default Navbar;
