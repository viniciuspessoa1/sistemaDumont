import * as crypto from 'crypto';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SecurityService {
  constructor(private config: ConfigService) {}
  
  validate(body: any, signature: string) {
    const secret = this.config.get<string>('WEBHOOK_SECRET');

    const expected = crypto
      .createHmac('sha256', secret!)
      .update(JSON.stringify(body))
      .digest('base64');

    if (expected !== signature) {
      throw new ForbiddenException('Invalid signature');
    }

    const diff = Math.abs(Date.now() - body.timestamp);
    if (diff > 60000) {
      throw new ForbiddenException('Expired request');
    }
  }
}