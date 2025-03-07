import { useState, useEffect } from "react";
import { getResidents, addResident, updateResident, deleteResident } from "../api/residentApi";

function Residents() {
  const [residents, setResidents] = useState([]);
  const [newResident, setNewResident] = useState({ fullName: "", apartmentId: "", phone: "", email: "" });
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState({ fullName: "", apartmentId: "", phone: "", email: "" });

  useEffect(() => {
    fetchResidents();
  }, []);

  const fetchResidents = async () => {
    try {
      const data = await getResidents();
      setResidents(data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách cư dân:", error);
    }
  };

  const handleChange = (e) => {
    setNewResident({ ...newResident, [e.target.name]: e.target.value });
  };

  const handleAddResident = async () => {
    try {
      const residentData = {
        ...newResident,
        apartment: { apartmentId: parseInt(newResident.apartmentId) }
      };
      const addedResident = await addResident(residentData);
      setResidents([...residents, addedResident]);
      setNewResident({ fullName: "", apartmentId: "", phone: "", email: "" });
    } catch (error) {
      console.error("Lỗi khi thêm cư dân:", error);
    }
  };

  const handleEdit = (resident) => {
    setEditingId(resident.residentId);
    setEditingData({
      fullName: resident.fullName,
      apartmentId: resident.apartment?.apartmentId || "",
      phone: resident.phone,
      email: resident.email
    });
  };

  const handleUpdate = async () => {
    try {
      const updatedResident = {
        ...editingData,
        apartment: { apartmentId: parseInt(editingData.apartmentId) }
      };
      await updateResident(editingId, updatedResident);
      setResidents(residents.map((res) => (res.residentId === editingId ? { residentId: editingId, ...updatedResident } : res)));
      setEditingId(null);
    } catch (error) {
      console.error("Lỗi khi cập nhật cư dân:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa cư dân này?")) {
      try {
        await deleteResident(id);
        setResidents(residents.filter((res) => res.residentId !== id));
      } catch (error) {
        console.error("Lỗi khi xóa cư dân:", error);
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">👨‍👩‍👧 Quản lý cư dân</h1>

      <div className="mb-4 p-4 bg-gray-100 rounded">
        <h2 className="text-lg font-semibold mb-2">➕ Thêm cư dân mới</h2>
        <div className="flex space-x-2">
          <input type="text" name="fullName" value={newResident.fullName} onChange={handleChange} placeholder="Tên cư dân" className="border p-2 rounded w-1/3" />
          <input type="number" name="apartmentId" value={newResident.apartmentId} onChange={handleChange} placeholder="ID Căn hộ" className="border p-2 rounded w-1/3" />
          <input type="text" name="phone" value={newResident.phone} onChange={handleChange} placeholder="Số điện thoại" className="border p-2 rounded w-1/3" />
          <input type="email" name="email" value={newResident.email} onChange={handleChange} placeholder="Email" className="border p-2 rounded w-1/4" />
          <button onClick={handleAddResident} className="bg-blue-500 text-white px-4 py-2 rounded">Thêm</button>
        </div>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Tên cư dân</th>
            <th className="border border-gray-300 p-2">Căn hộ</th>
            <th className="border border-gray-300 p-2">Số điện thoại</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {residents.map((resident, index) => (
            <tr key={resident.residentId || index} className="text-center">
              {editingId === resident.residentId ? (
                <>
                  <td className="border border-gray-300 p-2">{resident.residentId}</td>
                  <td className="border border-gray-300 p-2">
                    <input type="text" value={editingData.fullName} onChange={(e) => setEditingData({ ...editingData, fullName: e.target.value })} className="border p-1 w-full" />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input type="number" value={editingData.apartmentId} onChange={(e) => setEditingData({ ...editingData, apartmentId: e.target.value })} className="border p-1 w-full" />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input type="text" value={editingData.phone} onChange={(e) => setEditingData({ ...editingData, phone: e.target.value })} className="border p-1 w-full" />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input type="email" value={editingData.email} onChange={(e) => setEditingData({ ...editingData, email: e.target.value })} className="border p-1 w-full" />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <button onClick={handleUpdate} className="bg-green-500 text-white px-2 py-1 rounded mr-2">Lưu</button>
                    <button onClick={() => setEditingId(null)} className="bg-gray-500 text-white px-2 py-1 rounded">Hủy</button>
                  </td>
                </>
              ) : (
                <>
                  <td className="border border-gray-300 p-2">{resident.residentId}</td>
                  <td className="border border-gray-300 p-2">{resident.fullName}</td>
                  <td className="border border-gray-300 p-2">{resident.apartment?.apartmentId || "Không có dữ liệu"}</td>
                  <td className="border border-gray-300 p-2">{resident.phone}</td>
                  <td className="border border-gray-300 p-2">{resident.email}</td>
                  <td className="border border-gray-300 p-2">
                    <button onClick={() => handleEdit(resident)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Sửa</button>
                    <button onClick={() => handleDelete(resident.residentId)} className="bg-red-500 text-white px-2 py-1 rounded">Xóa</button>
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

export default Residents;
