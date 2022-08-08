// eslint-disable-next-line import/no-extraneous-dependencies
import request from "supertest";

import { app } from "./server";

describe("Create Donation Form", () => {
  it("should be send missing fields", async () => {
    const response = await request(app).post("/donation").send({
      name: "bruno",
      email: "b@gmail.com",
      phone: "11971944409",
      zip: "38300-114",
    });
    expect(response.body.error).toBe(true);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("errorMessage");
    expect(response.body).toHaveProperty("requiredFields");
  });

  it("should be inform an invalid email", async () => {
    const response = await request(app)
      .post("/donation")
      .send({
        name: "bruno",
        email: "email",
        phone: "236123136127",
        zip: "3247324823478",
        city: "Ituiutaba",
        state: "Minas Gerais",
        streetAddress: "23123",
        number: "31837",
        complement: "frente mercado",
        neighborhood: "sei nao",
        deviceCount: 2,
        devices: [
          { type: "notebook", condition: "broken" },
          { type: "desktop", condition: "broken" },
        ],
      });
    expect(response.body.error).toBe(true);
    expect(response.statusCode).toBe(400);
  });

  it("should be send complete personal data, but not send devices", async () => {
    const response = await request(app).post("/donation").send({
      name: "bruno",
      email: "brunotheodoro123@gmail.com",
      phone: "236123136127",
      zip: "3247324823478",
      city: "Ituiutaba",
      state: "Minas Gerais",
      streetAddress: "23123",
      number: "31837",
      complement: "frente mercado",
      neighborhood: "sei nao",
      deviceCount: 1,
    });
    expect(response.body.error).toBe(true);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("errorMessage");
    expect(response.body.requiredFields).toStrictEqual(["devices"]);
  });

  it("should be deviceCount is different from the amount of items sent on devices", async () => {
    const response = await request(app)
      .post("/donation")
      .send({
        name: "bruno",
        email: "brunotheodoro123@gmail.com",
        phone: "236123136127",
        zip: "3247324823478",
        city: "Ituiutaba",
        state: "Minas Gerais",
        streetAddress: "23123",
        number: "31837",
        complement: "frente mercado",
        neighborhood: "sei nao",
        deviceCount: 2,
        devices: [{ type: "notebook", condition: "broken" }],
      });
    expect(response.body.error).toBe(true);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("errorMessage");
  });

  it("should be that sends an invalid device type", async () => {
    const response = await request(app)
      .post("/donation")
      .send({
        name: "bruno",
        email: "brunotheodoro123@gmail.com",
        phone: "236123136127",
        zip: "3247324823478",
        city: "Ituiutaba",
        state: "Minas Gerais",
        streetAddress: "23123",
        number: "31837",
        complement: "frente mercado",
        neighborhood: "sei nao",
        deviceCount: 2,
        devices: [
          { type: "notebook", condition: "broken" },
          { type: "teste", condition: "broken" },
        ],
      });
    expect(response.body.error).toBe(true);
    expect(response.statusCode).toBe(400);
  });

  it("should be that sends an invalid device condition", async () => {
    const response = await request(app)
      .post("/donation")
      .send({
        name: "bruno",
        email: "brunotheodoro123@gmail.com",
        phone: "236123136127",
        zip: "3247324823478",
        city: "Ituiutaba",
        state: "Minas Gerais",
        streetAddress: "23123",
        number: "31837",
        complement: "frente mercado",
        neighborhood: "sei nao",
        deviceCount: 2,
        devices: [
          { type: "notebook", condition: "broken" },
          { type: "desktop", condition: "teste" },
        ],
      });
    expect(response.body.error).toBe(true);
    expect(response.statusCode).toBe(400);
  });

  it("should be that sends an invalid type form", async () => {
    const response = await request(app)
      .post("/donation")
      .send({
        name: 123231,
        email: "brunotheodoro123@gmail.com",
        phone: "236123136127",
        zip: "3247324823478",
        city: "Ituiutaba",
        state: "Minas Gerais",
        streetAddress: "23123",
        number: "31837",
        complement: "frente mercado",
        neighborhood: "sei nao",
        deviceCount: "dad",
        devices: [
          { type: "notebook", condition: "broken" },
          { type: "desktop", condition: "broken" },
        ],
      });
    expect(response.body.error).toBe(true);
    expect(response.statusCode).toBe(400);
  });

  it("should be that sends data correct", async () => {
    const response = await request(app)
      .post("/donation")
      .send({
        name: "bruno",
        email: "email@gmail.com",
        phone: "236123136127",
        zip: "3247324823478",
        city: "Ituiutaba",
        state: "Minas Gerais",
        streetAddress: "23123",
        number: "31837",
        complement: "frente mercado",
        neighborhood: "sei nao",
        deviceCount: 2,
        devices: [
          { type: "screen", condition: "broken" },
          { type: "printer", condition: "broken" },
        ],
      });

    expect(response.statusCode).toBe(200);
  });
});
