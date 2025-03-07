import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Residents from "./pages/Residents";
import Apartments from "./pages/Apartments";
import Services from "./pages/Services";
import Notifications from "./pages/Notifications";
import InvoicePaymentManagement from "./pages/InvoicePayment";

function App() {
  return (
    <div className="pt-16"> {/* Đẩy nội dung xuống để không bị Navbar che mất */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/residents" element={<Residents />} />
        <Route path="/apartments" element={<Apartments />} />
        <Route path="/services" element={<Services />} />
        <Route path="Invoices" element={<InvoicePaymentManagement />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </div>
  );
}


export default App;
