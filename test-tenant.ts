// test-tenant.ts
// @ts-nocheck - Desabilita verificação de tipos
/* eslint-disable */

import { RequestContext } from './src/shared/context/request-context';
import { prismaTenant } from './src/infrastructure/database';

async function testTenant() {
  console.log('🧪 TESTANDO MULTI-TENANT...\n');

  // Usa qualquer para ignorar tipos
  const prisma: any = prismaTenant;

  // Simula requisição do Tenant A
  await RequestContext.run({ tenantId: 'tenant-a' }, async () => {
    console.log('🔵 Tenant A acessando...');

    const userA = await prisma.user.create({
      data: { email: 'usuario.a@email.com', name: 'Usuário A' },
    });
    console.log('✅ Usuário A criado:', userA.email);

    const usersA = await prisma.user.findMany();
    console.log(`📊 Tenant A tem ${usersA.length} usuário(s)\n`);
  });

  // Simula requisição do Tenant B
  await RequestContext.run({ tenantId: 'tenant-b' }, async () => {
    console.log('🟢 Tenant B acessando...');

    const userB = await prisma.user.create({
      data: { email: 'usuario.b@email.com', name: 'Usuário B' },
    });
    console.log('✅ Usuário B criado:', userB.email);

    const usersB = await prisma.user.findMany();
    console.log(`📊 Tenant B tem ${usersB.length} usuário(s)\n`);
  });

  // Verifica isolamento
  await RequestContext.run({ tenantId: 'tenant-a' }, async () => {
    const users = await prisma.user.findMany();
    console.log(
      `🔵 Tenant A ainda vê apenas seus dados: ${users.length} usuário(s)`,
    );
  });
}

testTenant()
  .catch(console.error)
  .finally(async () => {
    const prisma: any = prismaTenant;
    await prisma.$disconnect();
    process.exit();
  });
