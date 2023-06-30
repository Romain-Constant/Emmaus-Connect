const models = require("../models");

const browse = (req, res) => {
  models.status
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.status
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = async (req, res) => {
  try {
    const status = req.body;
    const [result] = await models.status.insert(status);
    res.json({ statusId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving the status");
  }
};

const edit = (req, res) => {
  const status = req.body;

  status.id = parseInt(req.params.id, 10);

  models.status
    .update(status)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
};
