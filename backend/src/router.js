const express = require("express");

const router = express.Router();
const fs = require("fs");

// Ajout de multer

const multer = require("multer");

// Ajout de uuid

const { v4: uuidv4 } = require("uuid");

// On définit la destination de stockage de nos fichiers

// route POST pour recevoir un fichier

const upload = multer({ dest: "./public/uploads" });

router.post(
  "/phone/uploadimg",
  upload.array("phoneimg", 3),
  async (req, res) => {
    req.files.forEach((file) => {
      const { originalname, filename } = file;
      const uniqueId = uuidv4();
      const newFileName = `${uniqueId}-${originalname}`;

      fs.rename(
        `./public/uploads/${filename}`,
        `./public/uploads/${newFileName}`,
        (err) => {
          if (err) {
            throw err;
          } else {
            console.info(`File renamed to ${newFileName}`);
          }
        }
      );
    });

    res.send("Files uploaded");
  }
);

const userControllers = require("./controllers/userControllers");

router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.put("/users/:id", userControllers.edit);
router.post("/users", userControllers.add);
router.delete("/users/:id", userControllers.destroy);

router.post("/users/login", userControllers.login);
router.post("/users/logout", userControllers.logout);

const phoneControllers = require("./controllers/phoneControllers");

router.get("/phone", phoneControllers.browse);
router.get("/phone/:id", phoneControllers.read);
router.put("/phone/:id", phoneControllers.edit);
router.post("/phone", phoneControllers.add);
router.delete("/phone/:id", phoneControllers.destroy);

const categoryControllers = require("./controllers/categoryControllers");

router.get("/category", categoryControllers.browse);
router.get("/category/:classification", categoryControllers.read);

const statusControllers = require("./controllers/statusControllers");

router.get("/status", statusControllers.browse);
router.get("/status/:id", statusControllers.read);
router.put("/status/:id", statusControllers.edit);
router.post("/status", statusControllers.add);

const centerControllers = require("./controllers/centerControllers");

router.get("/center", centerControllers.browse);
router.get("/center/:id", centerControllers.read);
router.put("/center/:name", centerControllers.edit);
router.post("/center", centerControllers.add);
router.delete("/center/:id", centerControllers.destroy);

module.exports = router;
