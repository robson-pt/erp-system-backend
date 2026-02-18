import { AsyncLocalStorage } from 'node:async_hooks';

export const tenantContext = new AsyncLocalStorage<{ tenantId: string }>();

export const getTenantId = () => {
  const store = tenantContext.getStore();
  if (!store) throw new Error('Tenant not set');
  return store.tenantId;
};
