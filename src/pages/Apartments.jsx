import { useState, useEffect } from "react";
import { getApartments, addApartment, updateApartment, deleteApartment } from "../api/apartmentApi";

function Apartments() {
  const [apartments, setApartments] = useState([]);
  const [newApartment, setNewApartment] = useState({ apartmentNumber: "", area: "", status: "" });
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState({ apartmentNumber: "", area: "", status: "" });

  useEffect(() => {
    fetchApartments();
  }, []);

  const fetchApartments = async () => {
    try {
      const data = await getApartments();
      setApartments(data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách căn hộ:", error);
    }
  };

  const handleChange = (e) => {
    setNewApartment({
      ...newApartment,
      [e.target.name]: e.target.name === "area" ? parseFloat(e.target.value) || "" : e.target.value,
    });
  };

  const handleAddApartment = async () => {
    if (!newApartment.apartmentNumber || !newApartment.status) {
      alert("Vui lòng nhập số căn hộ và trạng thái!");
      return;
    }
    try {
      const addedApartment = await addApartment(newApartment);
      setApartments([...apartments, addedApartment]);
      setNewApartment({ apartmentNumber: "", area: "", status: "" });
    } catch (error) {
      console.error("Lỗi khi thêm căn hộ:", error);
    }
  };

  const handleEdit = (apartment) => {
    setEditingId(apartment.apartmentId);
    setEditingData({
      apartmentNumber: apartment.apartmentNumber,
      area: apartment.area,
      status: apartment.status,
    });
  };

  const handleUpdate = async () => {
    if (!editingData.apartmentNumber || !editingData.status) {
      alert("Vui lòng nhập số căn hộ và trạng thái!");
      return;
    }
    try {
      await updateApartment(editingId, editingData);
      setApartments(apartments.map((apt) => (apt.apartmentId === editingId ? { apartmentId: editingId, ...editingData } : apt)));
      setEditingId(null);
    } catch (error) {
      console.error("Lỗi khi cập nhật căn hộ:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa căn hộ này?")) {
      try {
        await deleteApartment(id);
        setApartments(apartments.filter((apt) => apt.apartmentId !== id));
      } catch (error) {
        console.error("Lỗi khi xóa căn hộ:", error);
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🏢 Quản lý Căn hộ</h1>

      <div className="mb-4 p-4 bg-gray-100 rounded">
        <h2 className="text-lg font-semibold mb-2">➕ Thêm căn hộ mới</h2>
        <div className="flex space-x-2">
          <input type="text" name="apartmentNumber" value={newApartment.apartmentNumber} onChange={handleChange} placeholder="Số căn hộ" className="border p-2 rounded w-1/3" />
          <input type="number" name="area" value={newApartment.area} onChange={handleChange} placeholder="Diện tích" className="border p-2 rounded w-1/3" />
          <input type="text" name="status" value={newApartment.status} onChange={handleChange} placeholder="Trạng thái" className="border p-2 rounded w-1/3" />
          <button onClick={handleAddApartment} className="bg-blue-500 text-white px-4 py-2 rounded">Thêm</button>
        </div>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Số căn hộ</th>
            <th className="border border-gray-300 p-2">Diện tích</th>
            <th className="border border-gray-300 p-2">Trạng thái</th>
            <th className="border border-gray-300 p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {apartments.map((apartment) => (
            <tr key={apartment.apartmentId} className="text-center">
              {editingId === apartment.apartmentId ? (
                <>
                  <td className="border border-gray-300 p-2">{apartment.apartmentId}</td>
                  <td className="border border-gray-300 p-2"><input type="text" value={editingData.apartmentNumber} onChange={(e) => setEditingData({ ...editingData, apartmentNumber: e.target.value })} className="border p-1 w-full" /></td>
                  <td className="border border-gray-300 p-2"><input type="number" value={editingData.area} onChange={(e) => setEditingData({ ...editingData, area: parseFloat(e.target.value) || "" })} className="border p-1 w-full" /></td>
                  <td className="border border-gray-300 p-2"><input type="text" value={editingData.status} onChange={(e) => setEditingData({ ...editingData, status: e.target.value })} className="border p-1 w-full" /></td>
                  <td className="border border-gray-300 p-2">
                    <button onClick={handleUpdate} className="bg-green-500 text-white px-2 py-1 rounded mr-2">Lưu</button>
                    <button onClick={() => setEditingId(null)} className="bg-gray-500 text-white px-2 py-1 rounded">Hủy</button>
                  </td>
                </>
              ) : (
                <>
                  <td className="border border-gray-300 p-2">{apartment.apartmentId}</td>
                  <td className="border border-gray-300 p-2">{apartment.apartmentNumber}</td>
                  <td className="border border-gray-300 p-2">{apartment.area}</td>
                  <td className="border border-gray-300 p-2">{apartment.status}</td>
                  <td className="border border-gray-300 p-2">
                    <button onClick={() => handleEdit(apartment)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Sửa</button>
                    <button onClick={() => handleDelete(apartment.apartmentId)} className="bg-red-500 text-white px-2 py-1 rounded">Xóa</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Apartments;
