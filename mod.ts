import { parse, Args } from "https://deno.land/std/flags/mod.ts";
import { Commands } from "./commands/commands.ts";
import { bold } from "https://deno.land/std/fmt/colors.ts";

export async function Process(): Promise<void> {

    const { args } = Deno;
    const data = parse(args);
    const commands = new Commands();

    const existingCommands = commands.getCommands();

    let currentCommandName = data["_"][0];

    let command = {
        [currentCommandName]: data["_"][1]
    };
    

    let options = Object.assign({}, data);
    delete options["_"];

    let optionKeys = Object.keys(options);
    if(optionKeys[0] == 'h' || optionKeys[0] == 'help' || optionKeys.length == 0 && currentCommandName == undefined) {
        commands.getHelp();
        return;
    } else if(optionKeys[0] == 'v' || optionKeys[0] == 'version') {
        commands.getVersion();
        return;
    }
    
    let found = false;
    for(let i = 0; i<existingCommands.length; i++) {
        let cmd = existingCommands[i];
        if(cmd.alias == currentCommandName || cmd.command == currentCommandName) {
            found = true;
            cmd.handler(cmd, command, options);
            break;
        }
    }

    if(!found) {
        // @ts-ignore
        console.log(`Found argument ${bold((currentCommandName != undefined) ? currentCommandName : optionKeys[0])} which wasn't expected, or isn't valid in this context
        USAGE:
        mandarine [OPTIONS] [SUBCOMMAND]
        `);
    }

}

if (import.meta.main) {
    Process();
}