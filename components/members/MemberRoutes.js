const express = require("express");
const router = express.Router();
const memberController = require("./MemberController");

router.get("/", memberController.getMembers);
router.post("/create", memberController.createMember);
router.put("/add-members-to-client", memberController.addMembersToClient);
// router.delete("/:id", memberController.deleteMember);

module.exports = router;
