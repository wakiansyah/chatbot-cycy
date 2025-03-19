const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware agar bisa membaca JSON dan menghindari error CORS
app.use(cors());
app.use(express.json());

const responses = {
  "hai": "hay maniis?",
  "apa kabar": "Aku baik caayang, terima kasih! Kamu sendiri gimana?",
  "kamu siapa": "Aku asisten tuan kiki!",
};

// Endpoint untuk menerima pesan dari user
app.post("/chat", (req, res) => {
  console.log("Request diterima:", req.body); // Debug log

  // Ambil pesan dari request
  const userMessages = req.body.messages;

  // Validasi agar messages berbentuk array
  if (!Array.isArray(userMessages)) {
    return res.status(400).json({ error: "Format pesan harus berupa array" });
  }

  // Buat respon chatbot berdasarkan pesan user
  const botReplies = userMessages.map((msg) => responses[msg.toLowerCase()] || "Maaf, aku tidak mengerti.");

  console.log("Bot replies:", botReplies); // Debug log

  // Kirim hasilnya ke Postman
  res.json({ replies: botReplies });
});

// Endpoint default untuk cek server
app.get("/", (req, res) => {
  res.send("Server berjalan dengan baik! 😃");
});

// Jalankan server
app.listen(port, () => {
  console.log(`Chatbot berjalan di http://localhost:${port}`);
});