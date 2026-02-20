import { prisma } from './prisma-client';
import { tenantExtension } from './prisma-tenant-extension';

// Cliente com tenant (para uso no sistema)
export const prismaTenant = prisma.$extends(tenantExtension);

// Cliente sem tenant (para admin/setup)
export { prisma } from './prisma-client';
