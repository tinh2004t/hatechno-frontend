import axios from "axios";

const API_URL = "http://localhost:8080/services";

// Lấy danh sách dịch vụ
export const getServices = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

// Thêm dịch vụ mới
export const addService = async (service) => {
  try {
    const response = await axios.post(`${API_URL}`, service);
    return response.data;
  } catch (error) {
    console.error("Error adding service:", error);
    throw error;
  }
};

// Cập nhật dịch vụ
export const updateService = async (serviceId, updatedService) => {
  try {
    const response = await axios.put(`${API_URL}/${serviceId}`, updatedService);
    return response.data;
  } catch (error) {
    console.error("Error updating service:", error);
    throw error;
  }
};

// Xóa dịch vụ
export const deleteService = async (serviceId) => {
  try {
    await axios.delete(`${API_URL}/${serviceId}`);
  } catch (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
};

// API cho Service Fees
const SERVICE_FEE_API = "http://localhost:8080/service-fees";

// Lấy danh sách phí dịch vụ
export const getServiceFees = async () => {
  try {
    const response = await axios.get(`${SERVICE_FEE_API}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching service fees:", error);
    throw error;
  }
};

// Thêm phí dịch vụ mới
export const addServiceFee = async (serviceFee) => {
  try {
    const response = await axios.post(`${SERVICE_FEE_API}`, serviceFee);
    return response.data;
  } catch (error) {
    console.error("Error adding service fee:", error);
    throw error;
  }
};

// Cập nhật phí dịch vụ
export const updateServiceFee = async (serviceFeeId, updatedServiceFee) => {
  try {
    const response = await axios.put(`${SERVICE_FEE_API}/${serviceFeeId}`, updatedServiceFee);
    return response.data;
  } catch (error) {
    console.error("Error updating service fee:", error);
    throw error;
  }
};

// Xóa phí dịch vụ
export const deleteServiceFee = async (serviceFeeId) => {
  try {
    await axios.delete(`${SERVICE_FEE_API}/${serviceFeeId}`);
  } catch (error) {
    console.error("Error deleting service fee:", error);
    throw error;
  }
};
