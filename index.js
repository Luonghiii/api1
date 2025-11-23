// index.js
const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.set("json spaces", 2);
app.use(morgan("dev"));

// ✅ MIDDLEWARE với Environment Variables
app.use("/api/*", (req, res, next) => {
  // 1. CORS - Lấy từ environment variable
  const allowedOrigins = process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',')
    : ['https://module-shadow.vercel.app', 'http://localhost:3000', 'https://luonghiii.id.vn'];
  
  const origin = req.headers.origin;
  
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  } else if (!origin) {
    return res.status(403).json({ 
      success: false,
      error: 'Access denied - No origin header'
    });
  } else {
    return res.status(403).json({ 
      success: false,
      error: 'Access denied - Invalid origin'
    });
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-API-Password');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // 2. Password check - Lấy từ environment variable
  const password = req.headers['x-api-password'];
  const correctPassword = process.env.API_PASSWORD || '29052007';
  
  if (password !== correctPassword) {
    return res.status(401).json({ 
      success: false,
      error: 'Invalid password'
    });
  }
  
  next();
});

// Các routes (giữ nguyên)
app.use("/api/bluesky", require("./routes/bluesky"));
app.use("/api/capcut", require("./routes/capcut"));
app.use("/api/dailymotion", require("./routes/dailymotion"));
app.use("/api/douyin", require("./routes/douyin"));
app.use("/api/kuaishou", require("./routes/kuaishou"));
app.use("/api/linkedin", require("./routes/linkedin"));
app.use("/api/meta", require("./routes/facebookInsta"));
app.use("/api/pinterest", require("./routes/pinterest"));
app.use("/api/reddit", require("./routes/reddit"));
app.use("/api/spotify", require("./routes/spotify"));
app.use("/api/snapchat", require("./routes/snapchat"));
app.use("/api/soundcloud", require("./routes/soundcloud"));
app.use("/api/threads", require("./routes/threads"));
app.use("/api/tiktok", require("./routes/tiktok"));
app.use("/api/tumblr", require("./routes/tumblr"));
app.use("/api/twitter", require("./routes/twitter"));
app.use("/api/youtube", require("./routes/youtube"));

const endpoints = [
  "/api/bluesky",
  "/api/capcut",
  "/api/dailymotion",
  "/api/douyin",
  "/api/kuaishou",
  "/api/linkedin",
  "/api/meta",
  "/api/pinterest",
  "/api/reddit",
  "/api/snapchat",
  "/api/spotify",
  "/api/soundcloud",
  "/api/threads",
  "/api/tiktok",
  "/api/tumblr",
  "/api/twitter",
  "/api/youtube",
];

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    author: "Milan Bhandari",
    contact: "https://www.milanb.com.np/",
    message: "Universal Downloader API is running",
    endpoints,
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint not found",
  });
});

app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({
    success: false,
    error: "Internal Server Error",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
