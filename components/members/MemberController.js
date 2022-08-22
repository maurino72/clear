const memberService = require("./MemberService");
const ClientModel = require("../clients/ClientModel");
const MemberModel = require("./MemberModel");

const getMembers = (req, res, next) => {
  // TODO: Implement Error handling

  let members = memberService.getAll();

  members
    .then((members) => {
      res.status(200).json(members);
    })
    .catch((err) => {
      // TODO: add error handler
      res.status(500).json(err.message);
    });
};

const createMember = (req, res, next) => {
  try {
    let memberData = req.body;
    let newMember = memberService.create(memberData);

    if (newMember) {
      res.status(200).json({
        message: "Member Created!",
        member: newMember
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const addMembersToClient = async (req, res, next) => {
  let clientId = req.body.clientId;
  let memberIds = req.body.memberIds;

  if (!clientId || !memberIds) {
    return res.status(400).json("Client and Members are required");
  }

  try {
    await ClientModel.findOneAndUpdate(
      { _id: clientId },
      { $push: { members: memberIds } }
    );
    await MemberModel.updateMany(
      { _id: memberIds },
      { $set: { client: clientId } }
    ).then((client) => {
      res.status(200).json("Member added to company!");
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getMembers,
  createMember,
  addMembersToClient
};
