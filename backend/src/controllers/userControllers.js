const dotenv = require("dotenv");

dotenv.config();

const jwt = require("jsonwebtoken");

const models = require("../models");
const userManager = require("../models/UserManager");

const browse = async (req, res) => {
  try {
    const users = await models.user.findAllUsers();
    res.send(users);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const read = (req, res) => {
  models.user
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

const edit = (req, res) => {
  const user = req.body;

  // TODO validations (length, format...)

  user.id = parseInt(req.params.id, 10);

  models.user
    .update(user)
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

const add = (req, res) => {
  const user = req.body;

  // TODO validations (length, format...)
  if (!user.password) {
    res.status(400).send("Le mot de passe est requis");
    return;
  }

  const {
    centerId,
    city,
    department,
    district,
    postalCode,
    streetNumber,
    streetType,
    email,
    password,
    firstname,
    lastname,
    phoneNumber,
    role,
  } = user;

  userManager
    .insertUserWithAddress(
      centerId,
      city,
      department,
      district,
      postalCode,
      streetNumber,
      streetType,
      email,
      password,
      firstname,
      lastname,
      phoneNumber,
      role
    )
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.user
    .delete(req.params.id)
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

const login = (req, res) => {
  const { email, password } = req.body;
  models.user.findByEmail(email).then((users) => {
    if (users.length === 0) {
      res.sendStatus(404);
    } else if (password !== users[0].password) {
      res.status(400).json("Wrong username or password !");
    } else {
      const user = { ...users[0] };
      delete user.password;
      const token = jwt.sign({ id: users[0].user_id }, process.env.JWT_SECRET);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(user);
    }
  });
};

const logout = (req, res) => {
  res
    .clearCookie("access_token", process.env.JWT_SECRET, {
      // Cette ligne supprime le cookie nommé "access_token" du navigateur de l'utilisateur.
      sameSite: "none", // Option qui garantit que le cookie sera supprimé même s'il est défini avec un site de même origine (same-site) différent.
      secure: true, // indique que le cookie doit être envoyé uniquement via une connexion sécurisée HTTPS.
    })
    .status(200)
    .json("User has been logged out");
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  login,
  logout,
};
