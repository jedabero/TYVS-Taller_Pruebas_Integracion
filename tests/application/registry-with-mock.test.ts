import { describe, expect, it, vi } from "vitest";

import type { RegistryRepositoryPort } from "../../src/application/port/out/registry-repository-port.ts";
import { RegistryUseCase } from "../../src/application/usecase/registry-use-case.ts";
import { Gender } from "../../src/domain/model/gender.ts";
import type { Person } from "../../src/domain/model/person.ts";
import { RegisterResult } from "../../src/domain/model/register-result.ts";

function createMockRepository(existsById = false): RegistryRepositoryPort {
  return {
    existsById: vi.fn(() => existsById),
    save: vi.fn(),
    findById: vi.fn(),
  };
}

describe("RegistryUseCase with Vitest mocks", () => {
  it("shouldSaveValidPerson", () => {
    // Arrange
    const repository = createMockRepository(false);
    const registry = new RegistryUseCase(repository);
    const person: Person = {
      name: "Valid Mock",
      id: 6,
      age: 25,
      gender: Gender.FEMALE,
      alive: true,
    };

    // Act
    const result = registry.registerVoter(person);

    // Assert
    expect(result).toBe(RegisterResult.VALID);
    expect(repository.existsById).toHaveBeenCalledWith(6);
    expect(repository.save).toHaveBeenCalledWith(person);
  });

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

  it("shouldNotSaveInvalidPerson", () => {
    // Arrange
    const repository = createMockRepository(false);
    const registry = new RegistryUseCase(repository);
    const person: Person = {
      name: "Invalid",
      id: 0,
      age: 30,
      gender: Gender.UNIDENTIFIED,
      alive: true,
    };

    // Act
    const result = registry.registerVoter(person);

    // Assert
    expect(result).toBe(RegisterResult.INVALID);
    expect(repository.existsById).not.toHaveBeenCalled();
    expect(repository.save).not.toHaveBeenCalled();
  });

  it("shouldPropagateRepositoryException", () => {
    // Arrange
    const repository = createMockRepository(false);
    const saveSpy = vi.spyOn(repository, "save").mockImplementation(() => {
      throw new Error("database unavailable");
    });
    const registry = new RegistryUseCase(repository);
    const person: Person = {
      name: "Failing Save",
      id: 9,
      age: 30,
      gender: Gender.MALE,
      alive: true,
    };

    // Act and Assert
    expect(() => registry.registerVoter(person)).toThrow("database unavailable");
    expect(saveSpy).toHaveBeenCalledWith(person);
  });
});
