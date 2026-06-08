import type { Gender } from "../../domain/model/gender.ts";

export interface RegistryRecord {
  id: number;
  name: string;
  age: number;
  gender: Gender;
  alive: boolean;
}
