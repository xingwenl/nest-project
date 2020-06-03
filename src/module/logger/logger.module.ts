import { Module, Global } from '@nestjs/common';
import { CustomLogger } from './logger';

@Global()
@Module({
  providers: [CustomLogger],
  exports: [CustomLogger],
})
export class LoggerModule {}
