const axios = require('axios');
const PORT = process.env.PORT || 3100;
const BASE_URI = process.env.BASE_URI || 'http://localhost';

exports.home = function(req, res) {
  res.render('index', { title: `Home` });
};

exports.addDrug = function(req, res) {
  res.render('add_drug', { title: `Add Drug` });
};

exports.updateDrug = function(req, res) {
  axios
    .get(`${BASE_URI}:${PORT}/api/drugs`, { params: { id: req.query.id } })
    .then(function(response) {
      res.render("update_drug", { drug: response.data, title: `Edit Drug` });
    })
    .catch(err => {
      res.status(500).render("error", {
        message: "Không thể tải dữ liệu thuốc để cập nhật.",
        error: err, title: 'Edit Drug'
      });
    });
};

exports.manage = function(req, res) {
  axios
    .get(`${BASE_URI}:${PORT}/api/drugs`)
    .then(function(response) {
      res.render('manage', { drugs: response.data, title: 'Manage drug info' });
    })
    .catch(err => {
      res.status(500).render("error", {
        message: "Không thể tải danh sách thuốc.",
        error: err, title: 'Manage drug info'
      });
    });
};

exports.dosage = function(req, res) {
  axios
    .get(`${BASE_URI}:${PORT}/api/drugs`)
    .then(function(response) {
      res.render('dosage', { drugs: response.data, title: 'Check Dosage' });
    })
    .catch(err => {
      res.status(500).render("error", {
        message: "Không thể tải thông tin liều lượng.",
        error: err, title: 'Check Dosage'
      });
    });
};

exports.purchase = function(req, res) {
  axios
    .get(`${BASE_URI}:${PORT}/api/drugs`)
    .then(function(response) {
      res.render('purchase', { drugs: response.data, title: 'Purchase Drugs', days: 30 });
    })
    .catch(err => {
      res.status(500).render("error", {
        message: "Không thể tải dữ liệu mua thuốc.",
        error: err, title: 'Purchase Drugs'
      });
    });
};
