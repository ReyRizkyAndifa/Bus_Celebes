fetch("http://localhost:3333/rute?asal=palu&tujuan=mamuju", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    asal: "sulteng",
    tujuan: "sulbar",
  }),
})
  .then((res) => res.json())
  .then((data) => {
    // data adalah GeoJSON LineString
    console.log(data);
  });

// Rute dari Palu ke Gorontalo
fetch("http://localhost:3333/rute?asal=palu&tujuan=gorontalo", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    asal: "sulteng",
    tujuan: "gorontalo",
  }),
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });

// Rute dari Palu ke Kendari
fetch("http://localhost:3333/rute?asal=palu&tujuan=kendari", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    asal: "sulteng",
    tujuan: "sultra",
  }),
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });

// Rute dari Palu ke Manado
fetch("http://localhost:3333/rute?asal=palu&tujuan=manado", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    asal: "sulteng",
    tujuan: "sulut",
  }),
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });

// Rute dari Palu ke Makassar
fetch("http://localhost:3333/rute?asal=palu&tujuan=makassar", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    asal: "sulteng",
    tujuan: "sulsel",
  }),
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });
