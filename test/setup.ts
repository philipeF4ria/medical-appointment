import { beforeAll, afterAll } from 'vitest';
import { randomUUID } from 'node:crypto';
import { execSync } from 'node:child_process';
import { Client } from 'pg'

const schemaDatabaseTest = randomUUID();

process.env.DATABASE_URL = `${process.env.DATABASE_URL}?schema=${schemaDatabaseTest}`

beforeAll(async () => {

  console.log(process.env.DATABASE_URL)

  await execSync('./node_modules/.bin/prisma migrate deploy')
});

afterAll(async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();
  await client.query(`drop schema if exists "${schemaDatabaseTest}" cascade`);
  await client.end();
})

