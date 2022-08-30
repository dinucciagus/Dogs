const { Router } = require("express");
const dogs_routes = require("./dogs_routes");
const temperament_routes = require("./temperament_routes");

const router = Router();
router.use("/dogs", dogs_routes);
router.use("/temperaments", temperament_routes);

module.exports = router;
