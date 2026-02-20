// infrastructure/database/prisma-tenant-extension.ts
// @ts-nocheck - Desabilita verificação TOTA de tipos
/* eslint-disable */

import { RequestContext } from '@/shared/context/request-context';

export const tenantExtension = (client: any) => {
  return client.$extends({
    query: {
      $allModels: {
        async findMany({ args, query }) {
          const tenantId = RequestContext.get()?.tenantId;
          if (!tenantId) return query(args);

          args.where = { ...args.where, tenantId };
          return query(args);
        },

        async findFirst({ args, query }) {
          const tenantId = RequestContext.get()?.tenantId;
          if (!tenantId) return query(args);

          args.where = { ...args.where, tenantId };
          return query(args);
        },

        async create({ args, query }) {
          const tenantId = RequestContext.get()?.tenantId;

          if (args.model === 'Tenant') {
            return query(args);
          }

          if (!tenantId) {
            throw new Error('Tenant ID não encontrado');
          }

          args.data = { ...args.data, tenantId };
          return query(args);
        },

        async update({ args, query }) {
          const tenantId = RequestContext.get()?.tenantId;
          if (!tenantId) return query(args);

          args.where = { ...args.where, tenantId };
          return query(args);
        },

        async delete({ args, query }) {
          const tenantId = RequestContext.get()?.tenantId;
          if (!tenantId) return query(args);

          args.where = { ...args.where, tenantId };
          return query(args);
        },

        async count({ args, query }) {
          const tenantId = RequestContext.get()?.tenantId;
          if (!tenantId) return query(args);

          args.where = { ...args.where, tenantId };
          return query(args);
        },
      },
    },
  });
};
