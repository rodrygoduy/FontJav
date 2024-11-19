import React, { useEffect, useState } from "react";
import axios from 'axios'
import '../Style/Room.css'
const Room = () => {
    const [rooms ,setRooms] = useState([])
    useEffect(()=> {
        axios.get('/home/phongs').then((response)=> {
            setRooms(response.data);

        }).catch((error)=> {
            console.error("Lỗi lấy dữ liệu phòng", error)
        })
    },[])
    return (
        <div className="room-container">
      {rooms.map((room) => (
        <div
          key={room.id}
          className={`room-card ${
            room.trangThai === "Đã đặt" ? "booked" : "available"
          }`}
        >
          <h3>Phòng: {room.maPhong}</h3>
          <p>Loại phòng: {room.loaiPhong}</p>
          <p>Trạng thái: {room.trangThai}</p>
          <p>
            ⏱ {room.gio ? `${room.gio} giờ` : "0 giờ"}
          </p>
          <p>
            {room.daDonDep ? (
              <span>✔ Đã dọn dẹp</span>
            ) : (
              <span>❌ Chưa dọn dẹp</span>
            )}
          </p>
        </div>
      ))}
    </div>
    )
}
export default Room