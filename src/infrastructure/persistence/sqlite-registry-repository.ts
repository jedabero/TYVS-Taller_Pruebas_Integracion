import { fileURLToPath } from "node:url";

import initSqlJs, { type Database, type SqlJsStatic } from "sql.js";

import type { RegistryRecord } from "../../application/model/registry-record.ts";
import type { RegistryRepositoryPort } from "../../application/port/out/registry-repository-port.ts";
import type { Person } from "../../domain/model/person.ts";
import { Gender } from "../../domain/model/gender.ts";

interface RegistryRow {
  id: number;
  name: string;
  age: number;
  gender: string;
  alive: number;
}

export class SqliteRegistryRepository implements RegistryRepositoryPort {
  constructor(private readonly database: Database) {}

  static async createInMemory(): Promise<SqliteRegistryRepository> {
    const SQL = await loadSqlJs();

    return new SqliteRegistryRepository(new SQL.Database());
  }

  initSchema(): void {
    this.database.run(
      `CREATE TABLE IF NOT EXISTS registry (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          age INTEGER NOT NULL,
          gender TEXT NOT NULL,
          alive INTEGER NOT NULL
        )`,
    );
  }

  existsById(id: number): boolean {
    const statement = this.database.prepare("SELECT 1 FROM registry WHERE id = ?");

    try {
      statement.bind([id]);

      return statement.step();
    } finally {
      statement.free();
    }
  }

  save(person: Person): void {
    this.database.run("INSERT INTO registry(id, name, age, gender, alive) VALUES (?, ?, ?, ?, ?)", [
      person.id,
      person.name,
      person.age,
      person.gender,
      person.alive ? 1 : 0,
    ]);
  }

  findById(id: number): RegistryRecord | undefined {
    const statement = this.database.prepare(
      "SELECT id, name, age, gender, alive FROM registry WHERE id = ?",
    );

    try {
      statement.bind([id]);

      if (!statement.step()) {
        return undefined;
      }

      const row = statement.getAsObject() as unknown as RegistryRow;

      return {
        id: row.id,
        name: row.name,
        age: row.age,
        gender: this.toGender(row.gender),
        alive: row.alive === 1,
      };
    } finally {
      statement.free();
    }
  }

  deleteAll(): void {
    this.database.run("DELETE FROM registry");
  }

  close(): void {
    this.database.close();
  }

  private toGender(value: string): Gender {
    if (value === Gender.MALE || value === Gender.FEMALE || value === Gender.UNIDENTIFIED) {
      return value;
    }

    return Gender.UNIDENTIFIED;
  }
}

let sqlJs: Promise<SqlJsStatic> | undefined;

function loadSqlJs(): Promise<SqlJsStatic> {
  sqlJs ??= initSqlJs({
    locateFile: (file) => fileURLToPath(new URL(`../../../node_modules/sql.js/dist/${file}`, import.meta.url)),
  });

  return sqlJs;
}
