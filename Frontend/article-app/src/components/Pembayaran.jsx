import React, { useState } from "react";

const bankOptions = [
  { name: "BCA", logo: "/img/bca.jpg" },
  { name: "BNI", logo: "/img/bni.jpg" },
  { name: "BRI", logo: "/img/bri.jpg" },
  { name: "Mandiri", logo: "/img/mandiri.jpg" },
];

export default function Pembayaran({ ticketId, onSuccess, onClose }) {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [namaPemesan, setNamaPemesan] = useState("");
  const [email, setEmail] = useState("");

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleBayar = (e) => {
    e.preventDefault();
    // Kamu bisa tambahkan validasi form di sini
    if (!namaPemesan || !email || !paymentMethod) {
      alert("Harap isi semua data pembayaran dan pilih metode pembayaran.");
      return;
    }
    // Simulasi proses pembayaran selesai
    onSuccess(); // panggil callback sukses bayar
  };

  return (
    <div className="bg-white rounded-xl p-6 max-h-[90vh] overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Isi Data Pembayaran</h2>

      <p className="mb-4">
        Silakan lakukan pembayaran untuk tiket dengan ID: <strong>{ticketId}</strong>
      </p>

      <form className="space-y-5" onSubmit={handleBayar}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nama Pemesan</label>
          <input
            type="text"
            value={namaPemesan}
            onChange={(e) => setNamaPemesan(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Nama Lengkap"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="@example.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Metode Pembayaran</label>
          <select
            className="w-full border border-gray-300 rounded-xl p-3 bg-white focus:ring-emerald-500 focus:border-emerald-500"
            value={paymentMethod}
            onChange={handlePaymentChange}
            required
          >
            <option value="">-- Pilih Metode Pembayaran --</option>
            <option value="transfer">Transfer Bank</option>
            <option value="qris">QRIS</option>
          </select>
        </div>

        {paymentMethod === "transfer" && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            {bankOptions.map((bank) => (
              <div
                key={bank.name}
                className="flex items-center space-x-3 border border-gray-300 rounded-xl p-3 shadow-sm hover:shadow-md transition cursor-pointer"
                onClick={() => alert(`Metode pembayaran dipilih: ${bank.name}`)} // opsional click handler
              >
                <img src={bank.logo} alt={bank.name} className="w-10 h-10 object-contain" />
                <span className="font-medium text-gray-700">{bank.name}</span>
              </div>
            ))}
          </div>
        )}

        {paymentMethod === "qris" && (
          <div className="flex justify-center items-center mt-4">
            <img 
              src="/img/qris.jpg"
              alt="QRIS"
              className="w-32 h-auto"
            />
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="bg-emerald-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-emerald-700 transition"
          >
            Bayar Sekarang
          </button>

          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-xl"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
