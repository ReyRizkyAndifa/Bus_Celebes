import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";

const Riwayat = () => {
  const [riwayat, setRiwayat] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRiwayat = async () => {
      try {
        const response = await fetch("http://localhost:3333/api/tickets");
        if (!response.ok) {
          throw new Error("Gagal mengambil data dari server");
        }
        const res = await response.json();
        const tiketDibayar = res.data.filter(
          (tiket) => tiket.status === "dibayar"
        );

        setRiwayat(tiketDibayar);
      } catch (err) {
        console.error("Gagal memuat riwayat tiket:", err);
        alert("Terjadi kesalahan saat memuat riwayat tiket.");
      } finally {
        setLoading(false);
      }
    };

    fetchRiwayat();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 pt-24 px-4">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Riwayat Pembayaran Tiket
          </h2>

          {loading ? (
            <p className="text-center text-gray-600">Memuat data...</p>
          ) : riwayat.length === 0 ? (
            <p className="text-center text-gray-600">
              Belum ada tiket yang dibayar.
            </p>
          ) : (
            <ul className="space-y-6">
              {riwayat.map((item) => (
                <li
                  key={item.id}
                  className="border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <p className="text-lg">
                    <strong>Nama:</strong> {item.penumpang}
                  </p>
                  <p className="text-lg">
                    <strong>Keberangkatan:</strong> {item.keberangkatan}
                  </p>
                  <p className="text-lg">
                    <strong>Tujuan:</strong> {item.tujuan}
                  </p>
                  <p className="text-lg">
                    <strong>Tanggal:</strong> {item.tanggal}
                  </p>
                  <p className="text-lg">
                    <strong>Kursi:</strong> {item.kursi}
                  </p>
                  <p className="text-lg">
                    <strong>Tipe Bus:</strong> {item.tipebus}
                  </p>
                  <p className="text-lg">
                    <strong>Harga:</strong> Rp{" "}
                    {item.harga.toLocaleString("id-ID")}
                  </p>
                  <p className="text-sm text-green-600 font-semibold">
                    ✅ Status: {item.status}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Riwayat;
