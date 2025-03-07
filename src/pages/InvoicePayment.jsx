import { useState, useEffect } from "react";
import { getInvoices, addInvoice } from "../api/invoiceApi";
import { getPayments, addPayment } from "../api/paymentApi";

function InvoicePaymentManagement() {
  const [invoices, setInvoices] = useState([]);
  const [payments, setPayments] = useState([]);
  const [newInvoice, setNewInvoice] = useState({ residentId: "", amount: "", dueDate: "", status: "CHUA_THANH_TOAN" });
  const [newPayment, setNewPayment] = useState({ invoiceId: "", amount: "", paymentDate: "", method: "MOMO" });

  useEffect(() => {
    fetchInvoices();
    fetchPayments();
  }, []);

  const fetchInvoices = async () => {
    try {
      const data = await getInvoices();
      setInvoices(data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  const fetchPayments = async () => {
    try {
      const data = await getPayments();
      setPayments(data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  const handleAddInvoice = async () => {
    try {
      const addedInvoice = await addInvoice(newInvoice);
      setInvoices([...invoices, addedInvoice]);
      setNewInvoice({ residentId: "", amount: "", dueDate: "", status: "CHUA_THANH_TOAN" });
    } catch (error) {
      console.error("Error adding invoice:", error);
    }
  };

  const handleAddPayment = async () => {
    try {
      const addedPayment = await addPayment(newPayment);
      setPayments([...payments, addedPayment]);
      setNewPayment({ invoiceId: "", amount: "", paymentDate: "", method: "MOMO" });
    } catch (error) {
      console.error("Error adding payment:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📜 Quản lý Hóa đơn & Thanh toán</h1>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-gray-100 rounded">
          <h2 className="text-lg font-semibold">➕ Thêm hóa đơn</h2>
          <input type="text" placeholder="Resident ID" value={newInvoice.residentId} onChange={(e) => setNewInvoice({ ...newInvoice, residentId: e.target.value })} className="border p-2 rounded w-full mb-2" />
          <input type="number" placeholder="Amount" value={newInvoice.amount} onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })} className="border p-2 rounded w-full mb-2" />
          <button onClick={handleAddInvoice} className="bg-blue-500 text-white px-4 py-2 rounded">Thêm</button>
        </div>

        <div className="p-4 bg-gray-100 rounded">
          <h2 className="text-lg font-semibold">💳 Thêm thanh toán</h2>
          <input type="text" placeholder="Invoice ID" value={newPayment.invoiceId} onChange={(e) => setNewPayment({ ...newPayment, invoiceId: e.target.value })} className="border p-2 rounded w-full mb-2" />
          <input type="number" placeholder="Amount" value={newPayment.amount} onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })} className="border p-2 rounded w-full mb-2" />
          <button onClick={handleAddPayment} className="bg-green-500 text-white px-4 py-2 rounded">Thêm</button>
        </div>
      </div>

      {/* Bảng hóa đơn */}
      <h2 className="text-xl font-semibold mt-4">📄 Danh sách Hóa đơn</h2>
      <table className="min-w-full bg-white border rounded-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Resident ID</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Due Date</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.invoiceId} className="border">
              <td className="p-2 border">{invoice.invoiceId}</td>
              <td className="p-2 border">{invoice.residentId}</td>
              <td className="p-2 border">{invoice.amount}</td>
              <td className="p-2 border">{invoice.dueDate}</td>
              <td className="p-2 border">{invoice.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Bảng thanh toán */}
      <h2 className="text-xl font-semibold mt-6">💰 Danh sách Thanh toán</h2>
      <table className="min-w-full bg-white border rounded-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Invoice ID</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Payment Date</th>
            <th className="p-2 border">Method</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.paymentId} className="border">
              <td className="p-2 border">{payment.paymentId}</td>
              <td className="p-2 border">{payment.invoiceId}</td>
              <td className="p-2 border">{payment.amount}</td>
              <td className="p-2 border">{payment.paymentDate}</td>
              <td className="p-2 border">{payment.method}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InvoicePaymentManagement;