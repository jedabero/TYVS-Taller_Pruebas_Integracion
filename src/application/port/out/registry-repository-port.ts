import type { Person } from "../../../domain/model/person.ts";
import type { RegistryRecord } from "../../../infrastructure/persistence/registry-record.ts";

export interface RegistryRepositoryPort {
  initSchema(): void;
  existsById(id: number): boolean;
  save(person: Person): void;
  findById(id: number): RegistryRecord | undefined;
  deleteAll(): void;
}
