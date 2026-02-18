import { Request, Response, NextFunction } from 'express';
import { RequestContext } from '@/shared/context';

export function tenantMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const tenantId = req.headers['x-tenant-id'] as string;

  if (!tenantId) {
    return res.status(400).json({ error: 'Tenant not provided' });
  }

  RequestContext.run({ tenantId }, () => {
    next();
  });
}
