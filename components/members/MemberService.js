const memberModel = require("./MemberModel");
const { Api400Error } = require("../../middleware/error/ApiErrors");

/*
 * Get all Members
 */
const getAll = async () => {
  const members = await memberModel.find().populate("client");

  return members;
};

/*
 * Create new Member
 * @param Object data
 */
const create = async (data) => {
  const newmember = await memberModel.create(data);
  return newmember;
};

/*
 * Update new Member
 * @param String id
 * @param Object data
 */
const update = async (id, data) => {
  const member = await memberModel.findOneAndUpdate(id, data);

  return member;
};

/*
 * Update new Member
 * @param String id
 */
const remove = async (id) => {
  const member = await memberModel.findOneAndRemove(id);

  return member;
};

module.exports = {
  getAll,
  create,
  update,
  remove
};
