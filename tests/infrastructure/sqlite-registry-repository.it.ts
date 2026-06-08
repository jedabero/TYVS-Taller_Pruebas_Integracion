import { afterEach, describe, expect, it } from "vitest";

import { Gender } from "../../src/domain/model/gender.ts";
import type { Person } from "../../src/domain/model/person.ts";
import type { SqliteRegistryRepository } from "../../src/infrastructure/persistence/sqlite-registry-repository.ts";
import { createTestRegistryRepository } from "../setup/test-database.ts";

describe("SqliteRegistryRepository", () => {
  const repositories = new Set<SqliteRegistryRepository>();

  afterEach(() => {
    for (const repository of repositories) {
      repository.close();
    }
    repositories.clear();
  });

  it("shouldPersistValidVoterInSqliteRepository", async () => {
    // Arrange
    const repository = await createTestRegistryRepository();
    repositories.add(repository);
    const person: Person = {
      name: "Laura",
      id: 3001,
      age: 34,
      gender: Gender.FEMALE,
      alive: true,
    };

    // Act
    repository.save(person);

    // Assert
    expect(repository.existsById(3001)).toBe(true);
    expect(repository.findById(3001)).toEqual(person);
  });

  it("shouldReturnUndefinedWhenRecordDoesNotExist", async () => {
    // Arrange
    const repository = await createTestRegistryRepository();
    repositories.add(repository);

    // Act
    const result = repository.findById(404);

    // Assert
    expect(result).toBeUndefined();
  });
});
