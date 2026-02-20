// infrastructure/database/prisma-client.ts
import { PrismaClient } from '@prisma';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
  adapter, // ← OBRIGATÓRIO no Prisma 7!
  log: ['query', 'error', 'warn'],
});
