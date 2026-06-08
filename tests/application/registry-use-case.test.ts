import { describe, expect, it } from "vitest";

import type { RegistryRepositoryPort } from "../../src/application/port/out/registry-repository-port.ts";
import { RegistryUseCase } from "../../src/application/usecase/registry-use-case.ts";
import { Gender } from "../../src/domain/model/gender.ts";
import type { Person } from "../../src/domain/model/person.ts";
import { RegisterResult } from "../../src/domain/model/register-result.ts";

function createRepository(): RegistryRepositoryPort {
  const records = new Map<number, Person>();

  return {
    existsById: (id: number) => records.has(id),
    save: (person: Person) => {
      records.set(person.id, person);
    },
    findById: (id: number) => records.get(id),
  };
}

describe("RegistryUseCase", () => {
  it("shouldRegisterValidPerson", () => {
    // Arrange
    const repository = createRepository();
    const registry = new RegistryUseCase(repository);
    const person: Person = {
      name: "Ana",
      id: 2001,
      age: 30,
      gender: Gender.FEMALE,
      alive: true,
    };

    // Act
    const result = registry.registerVoter(person);

    // Assert
    expect(result).toBe(RegisterResult.VALID);
    expect(repository.existsById(2001)).toBe(true);
  });

  it("shouldReturnDuplicatedWhenIdExists", () => {
    // Arrange
    const repository = createRepository();
    const registry = new RegistryUseCase(repository);
    const person: Person = {
      name: "Carlos",
      id: 2002,
      age: 28,
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
