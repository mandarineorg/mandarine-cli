// import { OptionsMetadata } from "../commands/types/type_options.ts";
import { CommandMetadata } from "../commands/types/types_command.ts";
import { bold } from "https://deno.land/std/fmt/colors.ts";
// import { Args } from "https://deno.land/std/flags/mod.ts";

export class CommandUtils {
    public static verifyRequiredOptions(cmd: CommandMetadata, contextOptions: object) {
        //@ts-ignore
        cmd.options.forEach((option) => {
            if(option.required == undefined) option.required = false;

            let byFlag = option.flag in contextOptions;

            // @ts-ignore
            let byAlias = option.alias in contextOptions;

            if(option.required && (!byFlag && !byAlias)) {
                throw `Option --${option.flag} (-${option.alias}) is required

                ${cmd.usage}`;
            }
        });
    }

    public static verifyValidityOptions(cmd: CommandMetadata, contextOptions: object) {
        Object.keys(contextOptions).forEach((cmdOptionKey) => {
            //@ts-ignore
            if(!cmd.options.some(option => option.alias == cmdOptionKey || option.flag == cmdOptionKey)) {
                throw `Found argument ${bold(cmdOptionKey)} which wasn't expected, or isn't valid in this context
                
                ${cmd.usage}`;
            }
        });
    }
}