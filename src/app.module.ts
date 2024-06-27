import { ConsoleLogger, Module } from '@nestjs/common';
import { CommandsService } from './commands.service';

@Module({
  providers: [CommandsService],
})
export class AppModule {}
