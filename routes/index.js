const express = require("express");
const clients = require("../components/clients/ClientRoutes");
const members = require("../components/members/MemberRoutes");

const router = express.Router();

router.use("/clients", clients);
router.use("/members", members);

module.exports = router;
