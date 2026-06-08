import { Test } from "@nestjs/testing";
import type { INestApplication } from "@nestjs/common";
import request from "supertest";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { RegistryUseCase } from "../../src/application/usecase/registry-use-case.ts";
import { RegistryController } from "../../src/delivery/http/registry.controller.ts";
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
    expect(response.status).toBe(200);
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

  it("shouldReturnConflictWhenPersonIsDuplicated", async () => {
    // Arrange
    const payload = {
      name: "Duplicated HTTP User",
      id: 5003,
      age: 30,
      gender: "FEMALE",
      alive: true,
    };
    await request(app.getHttpServer()).post("/register").send(payload);

    // Act
    const response = await request(app.getHttpServer()).post("/register").send(payload);

    // Assert
    expect(response.status).toBe(409);
    expect(response.body.message).toBe("DUPLICATED");
  });

  it("shouldReturnUnprocessableEntityWhenPersonIsUnderage", async () => {
    // Act
    const response = await request(app.getHttpServer()).post("/register").send({
      name: "Underage HTTP User",
      id: 5004,
      age: 17,
      gender: "UNIDENTIFIED",
      alive: true,
    });

    // Assert
    expect(response.status).toBe(422);
    expect(response.body.message).toBe("UNDERAGE");
  });

  it("shouldReturnUnprocessableEntityWhenPersonIsDead", async () => {
    // Act
    const response = await request(app.getHttpServer()).post("/register").send({
      name: "Dead HTTP User",
      id: 5005,
      age: 40,
      gender: "MALE",
      alive: false,
    });

    // Assert
    expect(response.status).toBe(422);
    expect(response.body.message).toBe("DEAD");
  });

  it("shouldReturnUnprocessableEntityWhenAgeIsInvalid", async () => {
    // Act
    const response = await request(app.getHttpServer()).post("/register").send({
      name: "Invalid Age HTTP User",
      id: 5006,
      age: 121,
      gender: "FEMALE",
      alive: true,
    });

    // Assert
    expect(response.status).toBe(422);
    expect(response.body.message).toBe("INVALID_AGE");
  });

  it("shouldReturnBadRequestWhenIdIsInvalid", async () => {
    // Act
    const response = await request(app.getHttpServer()).post("/register").send({
      name: "Invalid Id HTTP User",
      id: 0,
      age: 30,
      gender: "FEMALE",
      alive: true,
    });

    // Assert
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("INVALID");
  });

  it("shouldReturnInternalServerErrorWhenPersistenceFails", async () => {
    // Arrange
    const moduleRef = await Test.createTestingModule({
      controllers: [RegistryController],
      providers: [
        {
          provide: RegistryUseCase,
          useValue: {
            registerVoter: () => {
              throw new Error("database unavailable");
            },
          },
        },
      ],
    }).compile();
    const failingApp = moduleRef.createNestApplication();
    await failingApp.init();

    try {
      // Act
      const response = await request(failingApp.getHttpServer()).post("/register").send({
        name: "Failing HTTP User",
        id: 5007,
        age: 30,
        gender: "FEMALE",
        alive: true,
      });

      // Assert
      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Registry persistence failed");
    } finally {
      await failingApp.close();
    }
  });
});
