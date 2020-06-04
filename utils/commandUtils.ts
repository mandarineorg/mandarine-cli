import { OptionsMetadata } from "../commands/options/optionsMetadata.ts";
import { Args } from "https://deno.land/std/flags/mod.ts";

export class CommandUtils {
    public static verifyRequiredOptions(options: Array<OptionsMetadata>, contextOptions: object) {
        options.forEach((option) => {
            if(option.required == undefined) option.required = false;

            let byFlag = option.flag in contextOptions;

            // @ts-ignore
            let byAlias = option.alias in contextOptions;

            if(option.required && (!byFlag && !byAlias)) {
                throw `Option --${option.flag} (-${option.alias}) is required`;
            }
        });
    }

    public static verifyValidityOptions(options: Array<OptionsMetadata>, contextOptions: object) {
        Object.keys(contextOptions).forEach((cmdOptionKey) => {
            if(!options.some(option => option.alias == cmdOptionKey || option.flag == cmdOptionKey)) {
                throw `Found argument ${cmdOptionKey} which wasn't expected, or isn't valid in this context`;
            }
        });
    }
}