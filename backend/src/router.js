const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);


const phoneControllers=require ("./controllers/phoneControllers");


router.get("/phone", phoneControllers.browse);
router.get("/phone/:id", phoneControllers.read);
router.put("/phone/:id", phoneControllers.edit);
router.post("/phone", phoneControllers.add);
router.delete("/phone/:id", phoneControllers.destroy);

const userControllers = require("./controllers/userControllers");

router.get("/user", userControllers.browse);
router.get("/user/:id", userControllers.read);
router.put("/user/:id", userControllers.edit);
router.post("/user", userControllers.add);
router.delete("/user/:id", userControllers.destroy);

const categoryControllers = require("./controllers/categoryControllers");

router.get("/category", categoryControllers.browse);
router.get("/category/:id", categoryControllers.read);
router.put("/category/:id", categoryControllers.edit);
router.post("/category", categoryControllers.add);
router.delete("/category/:id", categoryControllers.destroy);

const statusControllers = require("./controllers/statusControllers");

router.get("/status", statusControllers.browse);
router.get("/status/:id", statusControllers.read);
router.put("/status/:id", statusControllers.edit);
router.post("/status", statusControllers.add);
router.delete("/status/:id", statusControllers.destroy);

const centerControllers = require("./controllers/centerControllers");

router.get("/center", centerControllers.browse);
router.get("/center/:id", centerControllers.read);
router.put("/center/:id", centerControllers.edit);
router.post("/center", centerControllers.add);
router.delete("/center/:id", centerControllers.destroy);

module.exports = router;
