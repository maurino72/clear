const request = require("supertest");
const app = require("../../../app");
const clientService = require("../../../components/clients/ClientService");
const clientContoller = require("../../../components/clients/ClientController");
const agent = request.agent(app);

const db = require("../../config/database");
beforeAll(async () => await db.connect(), 10000);
afterEach(async () => await db.clear(), 10000);
afterAll(async () => await db.close(), 10000);

describe("Client Controller", () => {
  it("Should return clients", async () => {
    await agent
      .get("/api/v1/clients")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("Should create a new Client", async () => {
    const newClient = {
      company_name: "Globant SA",
      address: "Av. Pueyrredon 815",
      city: "Cordoba",
      state: "Cordoba",
      zipCode: 5000,
      headcount: 5
    };

    await agent
      .post("/api/v1/clients/create")
      .send(newClient)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("Should create a new Client", async () => {
    const newClient = {
      state: "Cordoba",
      zipCode: 5000,
      headcount: 5
    };

    await agent
      .post("/api/v1/clients/create")
      .send(newClient)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });
});
