const express = require("express");
const morgan = require("morgan");
const cors = require("cors"); // Tớ thêm thư viện này để xử lý CORS đơn giản nhất

const app = express();

// ✅ Cấu hình cơ bản
app.use(cors()); // Cho phép tất cả mọi người truy cập (Simple CORS)
app.use(express.json());
app.set("json spaces", 2);
app.use(morgan("dev"));

// ✅ Danh sách các Routes
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
  "terabox": "./routes/terabox",
  "threads": "./routes/threads",
  "tiktok": "./routes/tiktok",
  "tumblr": "./routes/tumblr",
  "twitter": "./routes/twitter",
  "youtube": "./routes/youtube"
};

// ✅ Tự động đăng ký routes
Object.keys(routes).forEach(path => {
  try {
    app.use(`/api/${path}`, require(routes[path]));
  } catch (err) {
    console.warn(`⚠️ Cảnh báo: Không tìm thấy file hoặc lỗi tại ${routes[path]}`);
  }
});

// ✅ Lấy danh sách để hiển thị ở trang chủ
const endpoints = Object.keys(routes).map(path => `/api/${path}`);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    author: "Nguyễn Xuân Đức Lương",
    contact: "https://facebook.com/luonghiii/",
    message: "API đã sẵn sàng hoạt động! ",
    endpoints,
  });
});

// ✅ Xử lý 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint không tồn tại!",
  });
});

// ✅ Xử lý lỗi hệ thống
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({
    success: false,
    error: "Lỗi hệ thống rồi bro ơi!",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server của Lương đang chạy tại cổng ${PORT}`);
});
