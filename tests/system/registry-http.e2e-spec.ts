import { Test } from "@nestjs/testing";
import type { INestApplication } from "@nestjs/common";
import request from "supertest";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { RegistryModule } from "../../src/delivery/http/registry.module.ts";

describe("Registry HTTP system", () => {
  let app: INestApplication;

  beforeEach(async () => {
    // Arrange
    const moduleRef = await Test.createTestingModule({
      imports: [RegistryModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    if (app != null) {
      await app.close();
    }
  });

  it("shouldReturnValidThroughHttpEndpoint", async () => {
    // Act
    const response = await request(app.getHttpServer())
      .post("/register")
      .send({
        name: "HTTP User",
        id: 5001,
        age: 25,
        gender: "UNIDENTIFIED",
        alive: true,
      });

    // Assert
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ result: "VALID" });
  });

  it("shouldReturnBadRequestWhenPayloadIsInvalid", async () => {
    // Act
    const response = await request(app.getHttpServer())
      .post("/register")
      .send({ name: "Invalid", id: 5002, age: 25, gender: "OTHER", alive: true });

    // Assert
    expect(response.status).toBe(400);
  });
});
