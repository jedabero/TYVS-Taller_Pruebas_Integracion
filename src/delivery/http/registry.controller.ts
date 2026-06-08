import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  InternalServerErrorException,
  Post,
  UnprocessableEntityException,
} from "@nestjs/common";

import { RegistryUseCase } from "../../application/usecase/registry-use-case.ts";
import { Gender } from "../../domain/model/gender.ts";
import type { Person } from "../../domain/model/person.ts";
import { RegisterResult } from "../../domain/model/register-result.ts";
import type { PersonRequestDto } from "./dto/person-request.dto.ts";

@Controller("register")
export class RegistryController {
  constructor(private readonly registry: RegistryUseCase) {}

  @Post()
  @HttpCode(200)
  register(@Body() request: PersonRequestDto): { result: string } {
    try {
      const result = this.registry.registerVoter(this.toPerson(request));

      this.throwWhenRejected(result);

      return { result };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof ConflictException ||
        error instanceof UnprocessableEntityException
      ) {
        throw error;
      }

      throw new InternalServerErrorException("Registry persistence failed");
    }
  }

  private throwWhenRejected(result: RegisterResult): void {
    if (result === RegisterResult.VALID) {
      return;
    }

    if (result === RegisterResult.DUPLICATED) {
      throw new ConflictException(result);
    }

    if (result === RegisterResult.INVALID) {
      throw new BadRequestException(result);
    }

    throw new UnprocessableEntityException(result);
  }

  private toPerson(request: PersonRequestDto): Person {
    if (
      typeof request.name !== "string" ||
      typeof request.id !== "number" ||
      typeof request.age !== "number" ||
      typeof request.gender !== "string" ||
      typeof request.alive !== "boolean"
    ) {
      throw new BadRequestException("Invalid person payload");
    }

    if (!this.isGender(request.gender)) {
      throw new BadRequestException("Invalid gender");
    }

    return {
      name: request.name,
      id: request.id,
      age: request.age,
      gender: request.gender,
      alive: request.alive,
    };
  }

  private isGender(value: string): value is Gender {
    return value === Gender.MALE || value === Gender.FEMALE || value === Gender.UNIDENTIFIED;
  }
}
