import { SqliteRegistryRepository } from "../../src/infrastructure/persistence/sqlite-registry-repository.ts";

export async function createTestRegistryRepository(): Promise<SqliteRegistryRepository> {
  const repository = await SqliteRegistryRepository.createInMemory();
  repository.initSchema();
  repository.deleteAll();

  return repository;
}
