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
});
