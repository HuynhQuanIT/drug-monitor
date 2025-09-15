const express = require('express'); // As in the server.js
const route = express.Router();     // Allows us use express router in this file
const services = require('../services/render'); // view render
const controller = require('../controller/controller'); // CRUD controller
const validateDrug = require('../middlewares/validation'); // validation middleware

// ------------------ VIEWS ------------------ //
route.get('/', services.home);
route.get('/manage', services.manage);
route.get('/dosage', services.dosage);
route.get('/add-drug', services.addDrug);
route.get('/update-drug', services.updateDrug);
route.get('/purchase', services.purchase);

// Purchase page (render + logic)
route.post('/purchase', controller.postPurchasePage);


// ------------------ API (CRUD) ------------------ //
route.post('/api/drugs', validateDrug, controller.create);
route.get('/api/drugs', controller.find);
route.put('/api/drugs/:id', validateDrug, controller.update);
route.delete('/api/drugs/:id', controller.delete);

module.exports = route; // exports this so it can always be used elsewhere
