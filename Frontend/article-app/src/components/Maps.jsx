import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const koordinatKota = {
  Palu: [119.8707, -0.8917],
  Manado: [124.8456, 1.4748],
  Makassar: [119.4124, -5.1477],
  Kendari: [122.5169, -3.9778],
  Gorontalo: [123.0595, 0.5435],
  Mamuju: [118.8866, -2.6833],
};

const wilayah = [
  { kode: "Palu", nama: "Palu" },
  { kode: "Manado", nama: "Manado" },
  { kode: "Makassar", nama: "Makassar" },
  { kode: "Kendari", nama: "Kendari" },
  { kode: "Gorontalo", nama: "Gorontalo" },
  { kode: "Mamuju", nama: "Mamuju" },
];

const iconAsal = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const iconTujuan = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

function FitBounds({ geoData }) {
  const map = useMap();
  useEffect(() => {
    if (geoData) {
      const bounds = L.geoJSON(geoData).getBounds();
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [geoData, map]);
  return null;
}

function Maps() {
  const [asal, setAsal] = useState("");
  const [tujuan, setTujuan] = useState("");
  const [geoData, setGeoData] = useState(null);
  const [showMarkers, setShowMarkers] = useState(false);
  const [infoRute, setInfoRute] = useState(null);

  const handleCari = async () => {
    if (!asal || !tujuan) {
      alert("Pilih asal dan tujuan terlebih dahulu");
      return;
    }

    const koordinatAsal = koordinatKota[asal];
    const koordinatTujuan = koordinatKota[tujuan];

    if (!koordinatAsal || !koordinatTujuan) {
      alert("Koordinat tidak ditemukan");
      return;
    }

    setGeoData(null);
    setShowMarkers(false);
    setInfoRute(null);

    try {
      const res = await fetch(
        "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "5b3ce3597851110001cf6248dc5296c9d1da6b47968818b44d59bea0c656e69ca37473b517e7ed6e", // Ganti dengan API Key kamu
          },
          body: JSON.stringify({
            coordinates: [koordinatAsal, koordinatTujuan],
          }),
        }
      );

      if (!res.ok) throw new Error("Gagal mengambil rute");

      const data = await res.json();

      setGeoData(data);
      setShowMarkers(true);

    } catch (err) {
      console.error(err);
      alert("Gagal mengambil rute");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Peta Rute Bus Celebes</h2>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="flex flex-col">
          <label htmlFor="asal" className="font-medium mb-1">
            Asal:
          </label>
          <select
            id="asal"
            value={asal}
            onChange={(e) => setAsal(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value=""> Pilih Asal </option>
            {wilayah.map((w) => (
              <option key={w.kode} value={w.kode}>
                {w.nama}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="tujuan" className="font-medium mb-1">
            Tujuan:
          </label>
          <select
            id="tujuan"
            value={tujuan}
            onChange={(e) => setTujuan(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value=""> Pilih Tujuan </option>
            {wilayah.map((w) => (
              <option key={w.kode} value={w.kode}>
                {w.nama}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleCari}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mt-6"
        >
          Cari Rute
        </button>
      </div>

      {infoRute && (
        <div className="mb-4 p-4 bg-gray-100 rounded-md w-fit">
          <h4 className="font-semibold mb-1">Informasi Rute</h4>
          <p>
            <span className="font-medium">Jarak:</span> {infoRute.distance} km
          </p>
          <p>
            <span className="font-medium">Durasi:</span> {infoRute.duration}
          </p>
        </div>
      )}

      <div className="border rounded-md overflow-hidden">
       <MapContainer
        center={[-1.5, 121]}
        zoom={6}
        style={{ height: "80vh", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {showMarkers && asal && koordinatKota[asal] && (
          <Marker
            position={[koordinatKota[asal][1], koordinatKota[asal][0]]}
            icon={iconAsal}
          >
            <Popup>Asal: {asal}</Popup>
          </Marker>
        )}

        {showMarkers && tujuan && koordinatKota[tujuan] && (
          <Marker
            position={[koordinatKota[tujuan][1], koordinatKota[tujuan][0]]}
            icon={iconTujuan}
          >
            <Popup>Tujuan: {tujuan}</Popup>
          </Marker>
        )}

        {geoData && <GeoJSON data={geoData} style={{ color: "blue" }} />}
        {geoData && <FitBounds geoData={geoData} />}
      </MapContainer>
      </div>
    </div>
  );
}

export default Maps;
