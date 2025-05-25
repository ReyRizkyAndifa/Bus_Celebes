import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-purple-100 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-center text-sky-700 mb-6">About Us</h1>
        <p className="text-gray-700 text-lg leading-relaxed mb-4 text-center">
          Website <span className="font-semibold text-sky-700">Bus Celebes</span> adalah sebuah platform pemesanan tiket bus
          yang dibuat oleh <span className="font-semibold">Kelompok 1</span> sebagai bagian dari proyek pembelajaran berbasis web.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-4 text-center">
          Proyek ini dikembangkan dengan tujuan untuk memberikan kemudahan bagi pengguna dalam mencari rute bus, melihat jadwal keberangkatan,
          serta melakukan pemesanan tiket secara online.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-8 text-center">
          Adapun anggota dari <span className="font-semibold">Kelompok 1</span> yaitu: <span className="font-semibold text-sky-700">Cindy</span>, <span className="font-semibold text-sky-700">Angelina</span>, <span className="font-semibold text-sky-700">Ariel</span>, <span className="font-semibold text-sky-700">Rey</span>, dan <span className="font-semibold text-sky-700">Rifaldi</span>.
        </p>

        <div className="text-center">
          <h2 className="text-3xl font-semibold text-sky-600 mb-6">Meet the Team</h2>
          <div className="flex flex-col items-center">
            <img
              src="/public/img/kelompok1_api.jpeg" 
              alt="Kelompok 1"
              className="w-200 h-120 object-cover border-2 border-purple-300 shadow-md mb-4"
            />
            <h3 className="text-2xl font-bold text-sky-700">KELOMPOK 1</h3>
            <p className="text-gray-600 text-sm mt-2">Frontend & Backend Developer Bus Celebes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

//
