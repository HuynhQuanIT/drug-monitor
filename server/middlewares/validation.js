// middleware/validateDrug.js
function validateDrug(req, res, next) {
  const { name, dosage, card, pack, perDay } = req.body;

  // a. Tên phải dài hơn 5 ký tự
  if (!name || name.length <= 5) {
    return res.status(400).json({ error: "Tên thuốc phải dài hơn 5 ký tự." });
  }

  // b. Liều lượng phải đúng format: XX-morning,XX-afternoon,XX-night
  // Ví dụ: 10-morning,5-afternoon,2-night
  const dosagePattern = /^\d{1,2}-morning,\d{1,2}-afternoon,\d{1,2}-night$/;
  if (!dosagePattern.test(dosage)) {
    return res.status(400).json({
      error: "Liều lượng phải theo định dạng: XX-morning,XX-afternoon,XX-night (X là số)."
    });
  }

  // c. Card phải > 1000
  if (isNaN(card) || Number(card) <= 1000) {
    return res.status(400).json({ error: "Số viên trong 1 card phải lớn hơn 1000." });
  }

  // d. Pack phải > 0
  if (isNaN(pack) || Number(pack) <= 0) {
    return res.status(400).json({ error: "Số viên trong 1 pack phải lớn hơn 0." });
  }

  // e. PerDay phải > 0 và < 90
  if (isNaN(perDay) || Number(perDay) <= 0 || Number(perDay) >= 90) { 
    return res
      .status(400)
      .json({ error: "Số viên uống mỗi ngày phải lớn hơn 0 và nhỏ hơn 90." });
  }

  // Nếu tất cả điều kiện đều đúng → tiếp tục
  next();
}

module.exports = validateDrug;
