import { parse, Args } from "https://deno.land/std/flags/mod.ts";
import { Commands } from "./commands/options.ts";

const { args } = Deno;
const parsedArgs = parse(args);
const commands = new Commands();

async function Process(): Promise<void> {

    const data: Args = parsedArgs;
    const existingCommands = commands.getCommands();

    let currentCommandName = Object.keys(data)[1];

    let command = {
        [currentCommandName]: data[currentCommandName]
    };


    let options = Object.assign({}, data);
    delete options[Object.keys(options)[1]];
    delete options["_"];

    for(let i = 0; i<existingCommands.length; i++) {
        let cmd = existingCommands[i];

        if(cmd.alias == currentCommandName || cmd.command == currentCommandName) {
            cmd.handler(cmd, command, options);
            break;
        }
    }

}

if (import.meta.main) {
    Process();
}