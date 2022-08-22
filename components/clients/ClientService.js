const ClientModel = require("./ClientModel");

/*
 * Get All Clients
 */
const getAll = async () => {
  const clients = await ClientModel.find().populate("members");

  return clients;
};

/*
 * Create a new Client
 * @param data
 */
const create = async (data) => {
  // TODO: Validate require data is in the object
  try {
    return await ClientModel.create(data);
  } catch (error) {
    return error;
  }
};

/*
 * Update a Client
 * @param String id
 * @param Object data
 */
const update = async (id, data) => {
  // TODO: Validate require data is in the object

  const client = await ClientModel.findOneAndUpdate(id, data);
  // TODO: Validate client exist

  return client;
};

/*
 * Update a Client
 * @param String id
 */
const remove = async (id) => {
  // TODO: Verify is a valid id.
  const client = await ClientModel.findOneAndRemove(id);

  return client;
};

/*
 * Search for client by Name and/or State
 * @param String clientName
 * @param String clientState
 */
const search = async (query) => {
  let clients = ClientModel.find(query).populate("members");
  return clients.exec();
};

module.exports = {
  getAll,
  create,
  update,
  remove,
  search
};
