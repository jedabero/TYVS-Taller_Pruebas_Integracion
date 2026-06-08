import { Module } from "@nestjs/common";

import { RegistryUseCase } from "../../application/usecase/registry-use-case.ts";
import { SqliteRegistryRepository } from "../../infrastructure/persistence/sqlite-registry-repository.ts";
import { RegistryController } from "./registry.controller.ts";

export const REGISTRY_REPOSITORY = Symbol("REGISTRY_REPOSITORY");

@Module({
  controllers: [RegistryController],
  providers: [
    {
      provide: REGISTRY_REPOSITORY,
      useFactory: async () => {
        const repository = await SqliteRegistryRepository.createInMemory();
        repository.initSchema();
        return repository;
      },
    },
    {
      provide: RegistryUseCase,
      useFactory: (repository: SqliteRegistryRepository) => new RegistryUseCase(repository),
      inject: [REGISTRY_REPOSITORY],
    },
  ],
})
export class RegistryModule {}
