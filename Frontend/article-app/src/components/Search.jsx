import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarDays, MapPin, Users, X } from "lucide-react";
import { id } from "date-fns/locale";
import Pembayaran from "./Pembayaran";
import { useNavigate } from "react-router-dom";

export default function SearchCard() {
  const [penumpang, setPenumpang] = useState("");
  const [keberangkatan, setKeberangkatan] = useState("");
  const [tujuan, setTujuan] = useState("");
  const [tanggal, setTanggal] = useState(new Date());
  const [kursi, setKursi] = useState(1);
  const [tipebus, setTipebus] = useState("Ekonomi");
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [ticketId, setTicketId] = useState(null);

  const navigate = useNavigate();

  const busOptions = [
    { type: "Ekonomi", price: 50000 },
    { type: "Bisnis", price: 80000 },
    { type: "Eksekutif", price: 120000 },
  ];

  const selectedBus = busOptions.find((b) => b.type === tipebus);

  const openPayment = () => setIsPaymentOpen(true);
  const closePayment = () => {
    setIsPaymentOpen(false);
    setTicketId(null);
  };

  const handleBooking = async () => {
    const data = {
      penumpang,
      harga: selectedBus.price,
      tanggal: tanggal.toISOString().split("T")[0],
      kursi,
      keberangkatan,
      tujuan,
      tipebus,
    };

    try {
      const response = await fetch("http://localhost:3333/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error("Gagal menyimpan tiket");
      }

      const result = await response.json();
      setTicketId(result.data.id);
      setIsPaymentOpen(true);
    } catch (error) {
      console.error("Kesalahan:", error);
      alert("Terjadi kesalahan saat memesan tiket.");
    }
  };

  const handlePaymentSuccess = async () => {
    if (!ticketId) return;

    try {
      const response = await fetch(`http://localhost:3333/api/tickets/${ticketId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "dibayar" }),
      });

      if (!response.ok) {
        const err = await response.text();
        console.error("Error update status tiket:", err);
        throw new Error("Gagal update status tiket");
      }

      const data = await response.json();
      console.log("Update tiket sukses:", data);

      alert("Pembayaran berhasil, tiket Anda sudah terkonfirmasi!");
      closePayment();
      navigate("/riwayat"); // redirect setelah pembayaran sukses
    } catch (error) {
      alert("Gagal mengupdate status pembayaran tiket.");
      console.error(error);
    }
  };

  return (
    <div className="relative">
      <div className="max-w-md mx-auto p-4 bg-white rounded-2xl shadow-lg">
        <div className="text-sm font-medium bg-blue-600 text-white rounded-t-2xl px-4 py-2">
          🎫 Partner Resmi dan Terpercaya. Tiket dijamin resmi, bebas khawatir!
        </div>

        <div className="space-y-3 mt-4">
          {/* Penumpang */}
          <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg">
            <Users className="text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Nama Penumpang"
              value={penumpang}
              onChange={(e) => setPenumpang(e.target.value)}
              className="bg-transparent w-full outline-none text-sm"
            />
          </div>

          {/* Keberangkatan */}
          <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg">
            <MapPin className="text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Keberangkatan"
              value={keberangkatan}
              onChange={(e) => setKeberangkatan(e.target.value)}
              className="bg-transparent w-full outline-none text-sm"
            />
          </div>

          {/* Tujuan */}
          <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg">
            <MapPin className="text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Tujuan"
              value={tujuan}
              onChange={(e) => setTujuan(e.target.value)}
              className="bg-transparent w-full outline-none text-sm"
            />
          </div>

          {/* Tanggal */}
          <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg">
            <CalendarDays className="text-gray-500" size={20} />
            <DatePicker
              selected={tanggal}
              onChange={(date) => setTanggal(date)}
              locale={id}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              className="bg-transparent w-full outline-none text-sm"
            />
          </div>

          {/* Kursi */}
          <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg">
            <Users className="text-gray-500" size={20} />
            <input
              type="number"
              min={1}
              value={kursi}
              onChange={(e) => setKursi(Number(e.target.value))}
              className="bg-transparent w-full outline-none text-sm"
            />
          </div>

          {/* Tipe Bus */}
          <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg">
            <select
              value={tipebus}
              onChange={(e) => setTipebus(e.target.value)}
              className="bg-transparent w-full outline-none text-sm"
            >
              {busOptions.map((bus) => (
                <option key={bus.type} value={bus.type}>
                  {bus.type} - Rp {bus.price.toLocaleString("id-ID")}
                </option>
              ))}
            </select>
          </div>

          {/* Harga */}
          <div className="text-right text-gray-700 text-lg font-semibold">
            Harga: Rp {selectedBus.price.toLocaleString("id-ID")}
          </div>

          {/* Tombol Pesan */}
          <button
            onClick={handleBooking}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold"
          >
            Pesan
          </button>
        </div>
      </div>

      {/* Modal Pembayaran */}
      {isPaymentOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 relative w-full max-w-md shadow-lg">
            <button
              onClick={closePayment}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              <X size={24} />
            </button>

            <Pembayaran
              ticketId={ticketId}
              onSuccess={handlePaymentSuccess}
              onClose={closePayment}
            />
          </div>
        </div>
      )}
    </div>
  );
}
