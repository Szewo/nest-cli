import { Command, CommandRunner, Option } from 'nest-commander';
import * as fs from 'fs';

@Command({
  name: 'devstudio',
  description: 'Devstudio commands',
})
export class CommandsService extends CommandRunner {
  constructor() {
    super();
  }
  readonly MAX_BYTES: number = 10240;

  run(passedParams: string[], options?: Record<string, any>): Promise<void> {
    if (options?.help !== undefined) {
      console.log(options.help);
    } else if (options.version !== undefined) {
      console.log(options.version);
    } else if (options.show !== undefined) {
      console.log(options.show);
    }
    return Promise.resolve(undefined);
  }

  @Option({
    flags: '--help',
    description: 'Show help message',
  })
  showHelp(): string {
    return `Available commands: \n
            devstudio --help => show help message \n
            devstudio --version => show version \n
            devstudio --show={file} => show file contents \n`;
  }

  @Option({
    flags: '--version',
    description: 'Show version message',
  })
  showVersion(): string {
    return `Current version: 1.0`;
  }

  @Option({
    flags: '--show [file]',
    description: 'Show file contents',
  })
  showFileContents(file: string): string {
    const sizeInBytes: number = fs.statSync(file).size;
    if (sizeInBytes > this.MAX_BYTES) {
      return 'FILE IS TOO LARGE';
    }
    return fs.readFileSync(file, 'utf8');
  }
}
