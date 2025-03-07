import { useState, useEffect } from "react";
import { getServices, addService, updateService, deleteService, getServiceFees, addServiceFee, updateServiceFee, deleteServiceFee } from "../api/serviceApi";

function ServiceManagement() {
  const [services, setServices] = useState([]);
  const [serviceFees, setServiceFees] = useState([]);
  const [newService, setNewService] = useState({ serviceName: "", description: "", price: "" });
  const [newServiceFee, setNewServiceFee] = useState({ serviceId: "", amount: "", startDate: "", endDate: "" });

  useEffect(() => {
    fetchServices();
    fetchServiceFees();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await getServices();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const fetchServiceFees = async () => {
    try {
      const data = await getServiceFees();
      setServiceFees(data);
    } catch (error) {
      console.error("Error fetching service fees:", error);
    }
  };

  const handleAddService = async () => {
    try {
      const addedService = await addService(newService);
      setServices([...services, addedService]);
      setNewService({ serviceName: "", description: "", price: "" });
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  const handleAddServiceFee = async () => {
    try {
      const addedServiceFee = await addServiceFee(newServiceFee);
      setServiceFees([...serviceFees, addedServiceFee]);
      setNewServiceFee({ serviceId: "", amount: "", startDate: "", endDate: "" });
    } catch (error) {
      console.error("Error adding service fee:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🛠 Quản lý Dịch vụ & Phí Dịch vụ</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-100 rounded">
          <h2 className="text-lg font-semibold">➕ Thêm Dịch vụ</h2>
          <input type="text" placeholder="Tên dịch vụ" value={newService.serviceName} onChange={(e) => setNewService({ ...newService, serviceName: e.target.value })} className="border p-2 rounded w-full" />
          <input type="text" placeholder="Mô tả" value={newService.description} onChange={(e) => setNewService({ ...newService, description: e.target.value })} className="border p-2 rounded w-full" />
          <input type="number" placeholder="Giá" value={newService.price} onChange={(e) => setNewService({ ...newService, price: e.target.value })} className="border p-2 rounded w-full" />
          <button onClick={handleAddService} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Thêm</button>
        </div>

        <div className="p-4 bg-gray-100 rounded">
          <h2 className="text-lg font-semibold">💰 Thêm Phí Dịch vụ</h2>
          <input type="text" placeholder="ID dịch vụ" value={newServiceFee.serviceId} onChange={(e) => setNewServiceFee({ ...newServiceFee, serviceId: e.target.value })} className="border p-2 rounded w-full" />
          <input type="number" placeholder="Số tiền" value={newServiceFee.amount} onChange={(e) => setNewServiceFee({ ...newServiceFee, amount: e.target.value })} className="border p-2 rounded w-full" />
          <button onClick={handleAddServiceFee} className="bg-green-500 text-white px-4 py-2 rounded mt-2">Thêm</button>
        </div>
      </div>
    </div>
  );
}

export default ServiceManagement;
