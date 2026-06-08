import { Injectable } from "@nestjs/common";

import type { RegistryRepositoryPort } from "../port/out/registry-repository-port.ts";
import type { Person } from "../../domain/model/person.ts";
import { RegisterResult } from "../../domain/model/register-result.ts";

@Injectable()
export class RegistryUseCase {
  constructor(private readonly repository: RegistryRepositoryPort) {}

  registerVoter(person: Person | null | undefined): RegisterResult {
    const validationResult = this.validatePerson(person);

    if (validationResult !== RegisterResult.VALID) {
      return validationResult;
    }

    if (person == null) {
      return RegisterResult.INVALID;
    }

    if (this.repository.existsById(person.id)) {
      return RegisterResult.DUPLICATED;
    }

    this.repository.save(person);

    return RegisterResult.VALID;
  }

  private validatePerson(person: Person | null | undefined): RegisterResult {
    if (person == null) {
      return RegisterResult.INVALID;
    }

    if (person.id <= 0) {
      return RegisterResult.INVALID;
    }

    if (person.alive === false) {
      return RegisterResult.DEAD;
    }

    if (person.age < 0 || person.age > 120) {
      return RegisterResult.INVALID_AGE;
    }

    if (person.age < 18) {
      return RegisterResult.UNDERAGE;
    }

    return RegisterResult.VALID;
  }
}
