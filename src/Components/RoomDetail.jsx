import React from "react";
import "../Style/RoomDetail.css";
import { Popconfirm } from "antd";
const RoomDetail = ({ room, onEdit, onDelete, onClose }) => {
  if (!room) return null;

  return (
    <div className="room-detail-overlay">
      <div className="room-detail-container">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>

        <h2>Thông Tin Phòng</h2>
        <p>Mã phòng: {room.maPhong}</p>
        <p>Loại phòng: {room.loaiPhong}</p>
        <p>Giá phòng: {room.giaPhong.toLocaleString("vi-VN")} VND</p>
        <p>Trạng thái: {room.trangThaiPhong}</p>

        <div className="button-container">
          <button onClick={onEdit} className="edit-button">
            Sửa
          </button>
          <button
            onClick={() => onDelete(room.maPhong)}
            className="delete-button"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
