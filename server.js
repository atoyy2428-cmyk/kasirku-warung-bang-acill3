const express = require("express");

const app = express();

const PORT = 3000;


// Agar Express bisa membaca file HTML, CSS, dan JavaScript
app.use(express.static(__dirname));


// Halaman utama
app.get("/", function(req, res) {

    res.sendFile(__dirname + "/index.html");

});


// Jalankan server
app.listen(PORT, function() {

    console.log(`KasirKu berjalan di http://localhost:${PORT}`);

});