import { OptionsMetadata } from "./type_options.ts";

export interface CommandMetadata {
  command: string;
  alias: string;
  description: string;
  usage: string;
  handler: Function;
  options?: Array<OptionsMetadata>;
}
