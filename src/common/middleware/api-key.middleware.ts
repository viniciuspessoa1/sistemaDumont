import {
  Injectable,
  NestMiddleware,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const key = req.headers['api-key'];

    if (key !== process.env.API_KEY) {
      throw new ForbiddenException('Invalid API key');
    }

    next();
  }
}