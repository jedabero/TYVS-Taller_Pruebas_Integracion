import { afterEach, describe, expect, it } from "vitest";

import { RegistryUseCase } from "../../src/application/usecase/registry-use-case.ts";
import { Gender } from "../../src/domain/model/gender.ts";
import type { Person } from "../../src/domain/model/person.ts";
import { RegisterResult } from "../../src/domain/model/register-result.ts";
import type { SqliteRegistryRepository } from "../../src/infrastructure/persistence/sqlite-registry-repository.ts";
import { createTestRegistryRepository } from "../setup/test-database.ts";

describe("Registry integration", () => {
  const repositories = new Set<SqliteRegistryRepository>();

  afterEach(() => {
    for (const repository of repositories) {
      repository.close();
    }
    repositories.clear();
  });

  it("shouldRegisterValidPersonThroughUseCaseAndSqliteRepository", async () => {
    // Arrange
    const repository = await createTestRegistryRepository();
    repositories.add(repository);
    const registry = new RegistryUseCase(repository);
    const person: Person = {
      name: "Mario",
      id: 4001,
      age: 45,
      gender: Gender.MALE,
      alive: true,
    };

    // Act
    const result = registry.registerVoter(person);

    // Assert
    expect(result).toBe(RegisterResult.VALID);
    expect(repository.findById(4001)).toEqual(person);
  });

  it("shouldReturnDuplicatedWhenSqliteRepositoryAlreadyContainsId", async () => {
    // Arrange
    const repository = await createTestRegistryRepository();
    repositories.add(repository);
    const registry = new RegistryUseCase(repository);
    const person: Person = {
      name: "Mario",
      id: 4002,
      age: 45,
      gender: Gender.MALE,
      alive: true,
    };
    registry.registerVoter(person);

    // Act
    const result = registry.registerVoter(person);

    // Assert
    expect(result).toBe(RegisterResult.DUPLICATED);
  });

  it("shouldNotSaveUnderagePerson", async () => {
    // Arrange
    const repository = await createTestRegistryRepository();
    repositories.add(repository);
    const registry = new RegistryUseCase(repository);
    const person: Person = {
      name: "Underage",
      id: 4003,
      age: 17,
      gender: Gender.UNIDENTIFIED,
      alive: true,
    };

    // Act
    const result = registry.registerVoter(person);

    // Assert
    expect(result).toBe(RegisterResult.UNDERAGE);
    expect(repository.findById(4003)).toBeUndefined();
  });

  it("shouldNotSaveDeadPerson", async () => {
    // Arrange
    const repository = await createTestRegistryRepository();
    repositories.add(repository);
    const registry = new RegistryUseCase(repository);
    const person: Person = {
      name: "Dead",
      id: 4004,
      age: 40,
      gender: Gender.FEMALE,
      alive: false,
    };

    // Act
    const result = registry.registerVoter(person);

    // Assert
    expect(result).toBe(RegisterResult.DEAD);
    expect(repository.findById(4004)).toBeUndefined();
  });

  it("shouldNotSaveInvalidPerson", async () => {
    // Arrange
    const repository = await createTestRegistryRepository();
    repositories.add(repository);
    const registry = new RegistryUseCase(repository);
    const person: Person = {
      name: "Invalid",
      id: 0,
      age: 40,
      gender: Gender.FEMALE,
      alive: true,
    };

    // Act
    const result = registry.registerVoter(person);

    // Assert
    expect(result).toBe(RegisterResult.INVALID);
    expect(repository.findById(0)).toBeUndefined();
  });

  it("shouldNotSaveInvalidAgePerson", async () => {
    // Arrange
    const repository = await createTestRegistryRepository();
    repositories.add(repository);
    const registry = new RegistryUseCase(repository);
    const person: Person = {
      name: "Too Old",
      id: 4005,
      age: 121,
      gender: Gender.MALE,
      alive: true,
    };

    // Act
    const result = registry.registerVoter(person);

    // Assert
    expect(result).toBe(RegisterResult.INVALID_AGE);
    expect(repository.findById(4005)).toBeUndefined();
  });
});
