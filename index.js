const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.set("json spaces", 2);
app.use(morgan("dev"));

// ✅ MIDDLEWARE với Environment Variables & CORS tự chế
app.use("/api/*", (req, res, next) => {
  const allowedOrigins = process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',')
    : ['https://module-shadow.vercel.app', 'http://localhost:3000', 'https://luonghiii.id.vn', 'https://taivideo.luonghiii.id.vn'];
  
  const origin = req.headers.origin;
  
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  } else if (!origin) {
    // Cho phép các tool như Postman hoặc gọi trực tiếp từ trình duyệt không có origin
    res.setHeader('Access-Control-Allow-Origin', '*'); 
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
  
  next();
});

// ✅ Danh sách các Routes - Đã thêm Terabox từ code 2
const routes = {
  "bluesky": "./routes/bluesky",
  "capcut": "./routes/capcut",
  "dailymotion": "./routes/dailymotion",
  "douyin": "./routes/douyin",
  "kuaishou": "./routes/kuaishou",
  "linkedin": "./routes/linkedin",
  "meta": "./routes/facebookInsta",
  "pinterest": "./routes/pinterest",
  "reddit": "./routes/reddit",
  "snapchat": "./routes/snapchat",
  "spotify": "./routes/spotify",
  "soundcloud": "./routes/soundcloud",
  "terabox": "./routes/terabox", // <--- Thêm mới từ code 2
  "threads": "./routes/threads",
  "tiktok": "./routes/tiktok",
  "tumblr": "./routes/tumblr",
  "twitter": "./routes/twitter",
  "youtube": "./routes/youtube"
};

// Tự động đăng ký routes để code gọn hơn
Object.keys(routes).forEach(path => {
  app.use(`/api/${path}`, require(routes[path]));
});

// ✅ Danh sách endpoints để hiển thị ở trang chủ
const endpoints = Object.keys(routes).map(path => `/api/${path}`);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    author: "Nguyễn Xuân Đức Lương",
    contact: "https://facebook.com/luonghiii/",
    message: "api work rồi đó",
    endpoints,
  });
});

// Handling 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint not found",
  });
});

// Error Handler
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
