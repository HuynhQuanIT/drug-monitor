let Drugdb = require('../model/model');

// creates and saves a new drug
exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).render("error", {
      message: "Content cannot be empty!",
      error: {}
    });
  }

  const drug = new Drugdb({
    name: req.body.name,
    card: req.body.card,
    pack: req.body.pack,
    perDay: req.body.perDay,
    dosage: req.body.dosage
  });

  drug
    .save(drug)
    .then(data => {
      console.log(`${data.name} added to the database`);
      res.redirect('/manage');
    })
    .catch(err => {
      res.status(500).render("error", {
        message: err.message || "There was an error while adding the drug",
        error: err
      });
    });
};

// can either retrieve all drugs from the database or retrieve a single one
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    Drugdb.findById(id)
      .then(data => {
        if (!data) {
          return res.status(404).render("error", {
            message: "Can't find drug with id: " + id,
            error: {}
          });
        }
        res.send(data); // API vẫn trả JSON khi tìm 1 thuốc
      })
      .catch(err => {
        res.status(500).render("error", {
          message: "Error retrieving drug with id: " + id,
          error: err
        });
      });
  } else {
    Drugdb.find()
      .then(drug => {
        res.send(drug); // API trả JSON danh sách
      })
      .catch(err => {
        res.status(500).render("error", {
          message: err.message || "An error occurred while retrieving drug information",
          error: err
        });
      });
  }
};

// edits a drug selected using its ID
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).render("error", {
      message: "Cannot update an empty drug",
      error: {}
    });
  }

  const id = req.params.id;
  Drugdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        return res.status(404).render("error", {
          message: `Drug with id: ${id} cannot be updated`,
          error: {}
        });
      }
      res.send(data); // có thể redirect nếu muốn
    })
    .catch(err => {
      res.status(500).render("error", {
        message: "Error in updating drug information",
        error: err
      });
    });
};

// deletes a drug using its drug ID
exports.delete = (req, res) => {
  const id = req.params.id;

  Drugdb.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        return res.status(404).render("error", {
          message: `Cannot Delete drug with id: ${id}. Please check id`,
          error: {}
        });
      }
      res.send({ message: `${data.name} was deleted successfully!` });
    })
    .catch(err => {
      res.status(500).render("error", {
        message: "Could not delete Drug with id=" + id,
        error: err
      });
    });
};

function calculatePurchase(drugs, days) {
  return drugs.map((drug, index) => {
    const perDay = Number(drug.perDay);
    const card = Number(drug.card);
    const pack = Number(drug.pack);
    if (
      isNaN(perDay) || isNaN(card) || isNaN(pack) ||
      perDay <= 0 || card <= 0 || pack <= 0
    ) {
      throw new Error(`Thuốc ${drug.name} có dữ liệu không hợp lệ`);
    }
    const pills = days * perDay;
    const cardsToBuy = Math.ceil(pills / card);
    const packsToBuy = Math.ceil(pills / pack);

    return {
      id: index + 1,
      name: drug.name,
      cardsToBuy,
      packsToBuy,
      cardPerPack: pack / card
    };
  });
}

exports.getPurchasePage = async (req, res) => {
  try {
    const days = 30;
    const drugs = await Drugdb.find();
    const results = calculatePurchase(drugs, days);
    res.render("purchase", { drugs: results, days, title: "Purchase" });
  } catch (err) {
    res.status(500).render("error", {
      message: "Error loading purchase page",
      error: err
    });
  }
};

exports.postPurchasePage = async (req, res) => {
  try {
    const days = parseInt(req.body.days) || 30;
    const drugs = await Drugdb.find();
    const results = calculatePurchase(drugs, days);
    res.render("purchase", { drugs: results, days, title: "Purchase" });
  } catch (err) {
    res.status(500).render("error", {
      message: "Error calculating purchase data",
      error: err
    });
  }
};
