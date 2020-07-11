/**
 * object generic similar to use object but without errors
 * @type object generic
 */
export type objectGen = { [key: string]: any };

export interface OptionsMetadata {
  flag: string;
  alias?: string;
  description: string;
  required?: boolean;
  defaultValue?: any;
}

export interface CommandMetadata {
  command: string;
  alias: string;
  description: string;
  usage: string;
  handler: Function;
  options?: Array<OptionsMetadata>;
}
