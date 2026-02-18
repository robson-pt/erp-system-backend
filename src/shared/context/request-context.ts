import { AsyncLocalStorage } from 'node:async_hooks';

export type RequestContextType = {
  tenantId?: string;
  userId?: string;
  requestId?: string;
};

const storage = new AsyncLocalStorage<RequestContextType>();

class RequestContextService {
  run(data: RequestContextType, callback: () => void): void {
    storage.run(data, callback);
  }

  get(): RequestContextType | undefined {
    return storage.getStore();
  }

  set<K extends keyof RequestContextType>(
    key: K,
    value: RequestContextType[K],
  ): void {
    const store = storage.getStore();

    if (!store) {
      throw new Error('RequestContext not initialized');
    }

    store[key] = value;
  }
}

export const RequestContext = new RequestContextService();
