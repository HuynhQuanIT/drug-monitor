const validateDrug = (req, res, next) => {
    const { name, dosage, card, pack, perDay } = req.body;

    // Kiểm tra tên thuốc
    if (!name || name.length <= 5) {
        return res.status(400).json({
            message: "Tên thuốc phải có độ dài lớn hơn 5 ký tự"
        });
    }

    // Kiểm tra định dạng liều lượng
    const dosagePattern = /^\d{2}-morning,\d{2}-afternoon,\d{2}-night$/;
    if (!dosage || !dosagePattern.test(dosage)) {
        return res.status(400).json({
            message: "Liều lượng phải theo định dạng: XX-morning,XX-afternoon,XX-night (XX là số)"
        });
    }

    // Kiểm tra số lượng vỉ
    if (!card || parseInt(card) <= 1000) {
        return res.status(400).json({
            message: "Số lượng vỉ phải lớn hơn 1000"
        });
    }

    // Kiểm tra số viên mỗi vỉ
    if (!pack || parseInt(pack) <= 0) {
        return res.status(400).json({
            message: "Số viên mỗi vỉ phải lớn hơn 0"
        });
    }

    // Kiểm tra số viên mỗi ngày
    if (!perDay || parseInt(perDay) <= 0 || parseInt(perDay) >= 90) {
        return res.status(400).json({
            message: "Số viên mỗi ngày phải nằm trong khoảng 1-89"
        });
    }

    next();
};

module.exports = validateDrug;