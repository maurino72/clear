const clientService = require("./ClientService");
const ClientModel = require("./ClientModel");
const Api400Error = require("../../middleware/error/ApiErrors");

const getClients = async (req, res, next) => {
  let clients = clientService.getAll();
  // TODO: Add a paginator
  clients
    .then((clients) => {
      res.status(200).json(clients);
    })
    .catch((err) => {
      // TODO: add error handler
      res.status(500).json(err.message);
    });
};

const createClient = async (req, res, next) => {
  try {
    let clientData = req.body;
    const newClient = await clientService.create(clientData);

    if (newClient.errors) {
      console.log(newClient.errors);
      throw new Api400Error("Bad Request");
    }

    res.status(200).json("Client Created!");
  } catch (error) {
    console.log(error);
  }

  /* 
  newClient
    .then((result) => {
      console.log(result.message);
      
    })
    .catch((error) => {
      
    }); */
};

const updateClient = (req, res, next) => {
  let clientId = req.params.id;
  let clientData = req.body;

  let client = clientService.update(clientId, clientData);

  client.then(res.status(200).json("Client Updated!")).catch((err) => {
    res.status(err.code).json(err.message);
  });
};

const deleteClient = (req, res, next) => {
  let clientId = req.params.id;

  let client = clientService.remove(clientId);

  client.then(res.status(200).json("Client Deleted!")).catch((err) => {
    res.status(err.code).json(err.message);
  });
};

/*
 * Search for clients
 * TODO: Move this method to a SearchService.
 */
const searchClients = (req, res, next) => {
  const clientName = req.query.name;
  const clientState = req.query.state;

  if (!clientName && !clientState) {
    let error = new Error("No parameters were found");
    next(error);
  }

  let query = {};

  if (clientName) {
    query.company_name = { $regex: clientName, $options: "i" };
  }

  if (clientState) {
    query.state = { $regex: clientState, $options: "i" };
  }

  let clients = clientService.search(query);
  clients
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getClients,
  createClient,
  updateClient,
  deleteClient,
  searchClients
};
