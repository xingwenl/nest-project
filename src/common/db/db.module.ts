import { Module, Global } from '@nestjs/common';
import { dbProviders } from './db.providers';

@Global()
@Module({
    providers: [...dbProviders],
    exports: [...dbProviders],
})
export class DbModule {}
