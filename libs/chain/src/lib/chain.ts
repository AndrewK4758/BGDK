export type Context = {
  state: Map<string, unknown>;
  put: (key: string, value: unknown) => void;
  get: (key: string) => unknown;
  getString: (key: string) => string;
  getNumber: (key: string) => number;
};

export interface Command {
  execute: (context: Context) => boolean;
}

export interface Chain extends Command {
  getCommands(): Array<Command>;
}
