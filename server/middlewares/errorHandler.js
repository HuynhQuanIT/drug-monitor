// errorHandler/errorHandler.js

// Bắt lỗi 404 - Không tìm thấy trang
function notFound(req, res, next) {
  res.status(404).render("error", {
    message: "Trang bạn tìm không tồn tại (404).",
    error: null,       // không truyền stacktrace
    title: "Lỗi 404"
  });
}

// Bắt lỗi server / crash
function errorHandler(err, req, res, next) {
  console.error("💥 Error caught by handler:", err.message);

  res.status(err.status || 500).render("error", {
    message: "Đã xảy ra sự cố trên server. Vui lòng thử lại sau.",
    error: null,       // ẩn stacktrace, chỉ hiện văn bản
    title: "Lỗi hệ thống"
  });
}

module.exports = { notFound, errorHandler };
