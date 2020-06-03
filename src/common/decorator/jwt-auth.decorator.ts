import { SetMetadata } from '@nestjs/common';

export const JwtAuth = (...type: string[]) => SetMetadata('jwt', type);
