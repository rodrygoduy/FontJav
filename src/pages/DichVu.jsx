import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactModal from "react-modal";
import "../Style/DichVu.css";

const DichVu = () => {
  const [services, setServices] = useState([]); // Danh sách dịch vụ
  const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái modal
  const [currentService, setCurrentService] = useState(null); // Dịch vụ hiện tại (để sửa)
  const [searchTerm, setSearchTerm] = useState(""); // Từ khóa tìm kiếm

  // Lấy danh sách dịch vụ từ backend
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get("/home/dichvus");
      setServices(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách dịch vụ:", error);
    }
  };

  // Xóa dịch vụ
  const handleDelete = async (maDichVu) => {
    try {
      await axios.delete(`/home/dichvus/${maDichVu}`);
      fetchServices(); // Cập nhật danh sách sau khi xóa
    } catch (error) {
      console.error("Lỗi khi xóa dịch vụ:", error);
    }
  };

  // Mở modal thêm/sửa dịch vụ
  const openModal = (service = null) => {
    setCurrentService(service); // Nếu `service` null, modal sẽ thêm mới
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentService(null);
  };

  // Thêm hoặc sửa dịch vụ
  const handleSave = async (e) => {
    e.preventDefault();

    const serviceData = {
      maDichVu: e.target.maDichVu.value,
      tenDichVu: e.target.tenDichVu.value,
      giaDichVu: parseFloat(e.target.giaDichVu.value),
    };

    try {
      if (currentService) {
        // Sửa dịch vụ
        await axios.put(
          `/home/dichvus/${currentService.maDichVu}`,
          serviceData
        );
      } else {
        // Thêm mới dịch vụ
        await axios.post("/home/dichvus", serviceData);
      }
      fetchServices(); // Làm mới danh sách sau khi thêm/sửa
      closeModal(); // Đóng modal
    } catch (error) {
      console.error("Lỗi khi lưu dịch vụ:", error);
      console.log("Chi tiết lỗi:", error.response?.data); // Log phản hồi từ backend
    }
  };

  // Lọc danh sách dịch vụ theo từ khóa
  const filteredServices = services.filter((service) =>
    service.tenDichVu?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dichvu-container">
      <h1>Quản lý Dịch Vụ</h1>
      <div className="search-add-bar">
        <input
          type="text"
          placeholder="Tìm dịch vụ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => openModal()}>Thêm Dịch Vụ</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Mã DV</th>
            <th>Tên Dịch Vụ</th>
            <th>Giá</th>
            <th>Sửa</th>
            <th>Xóa</th>
          </tr>
        </thead>
        <tbody>
          {filteredServices.length === 0 ? (
            <tr>
              <td colSpan="5">Không có dữ liệu</td>
            </tr>
          ) : (
            filteredServices.map((service) => (
              <tr key={service.maDichVu}>
                <td>{service.maDichVu}</td>
                <td>{service.tenDichVu}</td>
                <td>{service.giaDichVu}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => openModal(service)}
                  >
                    Sửa
                  </button>
                </td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(service.maDichVu)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal thêm/sửa dịch vụ */}
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="DichVuModal__Content"
        overlayClassName="DichVuModal__Overlay"
      >
        <h2>{currentService ? "Sửa Dịch Vụ" : "Thêm Dịch Vụ"}</h2>
        <form onSubmit={handleSave}>
          <label>
            Mã Dịch Vụ:
            <input
              type="number"
              name="maDichVu"
              defaultValue={currentService?.maDichVu || ""}
              required
            />
          </label>
          <label>
            Tên Dịch Vụ:
            <input
              type="text"
              name="tenDichVu"
              defaultValue={currentService?.tenDichVu || ""}
              required
            />
          </label>
          <label>
            Giá Dịch Vụ:
            <input
              type="number"
              name="giaDichVu"
              defaultValue={currentService?.giaDichVu || ""}
              required
            />
          </label>
          <div className="modal-buttons">
            <button type="submit">Lưu</button>
            <button type="button" onClick={closeModal}>
              Hủy
            </button>
          </div>
        </form>
      </ReactModal>
    </div>
  );
};

export default DichVu;
