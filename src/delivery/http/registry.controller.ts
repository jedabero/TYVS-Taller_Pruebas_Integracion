import { BadRequestException, Body, Controller, Post } from "@nestjs/common";

import { RegistryUseCase } from "../../application/usecase/registry-use-case.ts";
import { Gender } from "../../domain/model/gender.ts";
import type { Person } from "../../domain/model/person.ts";
import type { PersonRequestDto } from "./dto/person-request.dto.ts";

@Controller("register")
export class RegistryController {
  constructor(private readonly registry: RegistryUseCase) {}

  @Post()
  register(@Body() request: PersonRequestDto): { result: string } {
    return { result: this.registry.registerVoter(this.toPerson(request)) };
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
