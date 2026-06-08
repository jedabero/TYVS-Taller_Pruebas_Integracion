import { describe, expect, it, vi } from "vitest";

import type { RegistryRepositoryPort } from "../../src/application/port/out/registry-repository-port.ts";
import { RegistryUseCase } from "../../src/application/usecase/registry-use-case.ts";
import { Gender } from "../../src/domain/model/gender.ts";
import type { Person } from "../../src/domain/model/person.ts";
import { RegisterResult } from "../../src/domain/model/register-result.ts";

function createMockRepository(existsById: boolean): RegistryRepositoryPort {
  return {
    initSchema: vi.fn(),
    existsById: vi.fn(() => existsById),
    save: vi.fn(),
    findById: vi.fn(),
    deleteAll: vi.fn(),
  };
}

describe("RegistryUseCase with Vitest mocks", () => {
  it("shouldReturnDuplicatedWhenIdExists", () => {
    // Arrange
    const repository = createMockRepository(true);
    const registry = new RegistryUseCase(repository);
    const person: Person = {
      name: "Ana",
      id: 7,
      age: 25,
      gender: Gender.FEMALE,
      alive: true,
    };

    // Act
    const result = registry.registerVoter(person);

    // Assert
    expect(result).toBe(RegisterResult.DUPLICATED);
    expect(repository.save).not.toHaveBeenCalled();
  });

  it("shouldNotSaveUnderagePerson", () => {
    // Arrange
    const repository = createMockRepository(false);
    const registry = new RegistryUseCase(repository);
    const person: Person = {
      name: "Sam",
      id: 8,
      age: 17,
      gender: Gender.UNIDENTIFIED,
      alive: true,
    };

    // Act
    const result = registry.registerVoter(person);

    // Assert
    expect(result).toBe(RegisterResult.UNDERAGE);
    expect(repository.existsById).not.toHaveBeenCalled();
    expect(repository.save).not.toHaveBeenCalled();
  });
});
