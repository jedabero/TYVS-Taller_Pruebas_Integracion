import type { Person } from "../../../domain/model/person.ts";
import type { RegistryRecord } from "../../model/registry-record.ts";

export interface RegistryRepositoryPort {
  existsById(id: number): boolean;
  save(person: Person): void;
  findById(id: number): RegistryRecord | undefined;
}
