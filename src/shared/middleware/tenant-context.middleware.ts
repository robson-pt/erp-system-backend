import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RequestContext } from '../context/request-context';

@Injectable()
export class TenantContextMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Extrai tenant do header X-Tenant-ID (padrão REST)
    const tenantId = req.headers['x-tenant-id'] as string;

    // Se não tiver tenant, ainda cria contexto (para rotas públicas)
    RequestContext.run(
      {
        tenantId,
        requestId: this.generateRequestId(),
      },
      () => {
        next();
      },
    );
  }

  private generateRequestId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
  }
}
