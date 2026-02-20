import { AsyncLocalStorage } from 'node:async_hooks';

export type RequestContextType = {
  tenantId?: string;
  userId?: string;
  requestId?: string;
};

const storage = new AsyncLocalStorage<RequestContextType>();

export class RequestContext {
  static run(data: RequestContextType, callback: () => void): void {
    storage.run(data, callback);
  }

  static get(): RequestContextType | undefined {
    return storage.getStore();
  }

  static set<K extends keyof RequestContextType>(
    key: K,
    value: RequestContextType[K],
  ): void {
    const store = storage.getStore();
    if (!store) {
      throw new Error('RequestContext não inicializado');
    }
    store[key] = value;
  }

  static getTenantId(): string {
    const context = this.get();
    if (!context?.tenantId) {
      throw new Error('Tenant não encontrado no contexto');
    }
    return context.tenantId;
  }
}
