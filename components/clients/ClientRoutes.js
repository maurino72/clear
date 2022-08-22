const express = require("express");
const router = express.Router();
const clientController = require("./ClientController");

router.get("/", clientController.getClients);
router.post("/create", clientController.createClient);
router.put("/:id/update", clientController.updateClient);
router.delete("/:id", clientController.deleteClient);
router.get("/search", clientController.searchClients);

module.exports = router;
