import { CommandMetadata } from "../commands/commandMetadata.ts";
import { CommandUtils } from "../utils/commandUtils.ts";
import { structure as MandarineProjectStructure } from "https://deno.land/x/mandarinets/mandarine-project-structure.ts";

export const NewCmd = (cmd: CommandMetadata, command: object, options: object) => {
    // @ts-ignore
    CommandUtils.verifyRequiredOptions(cmd.options, options);

    let cwd = Deno.cwd();
    
    MandarineProjectStructure.folders.forEach((folder) => {
        Deno.mkdirSync(`${cwd}${folder}`);
    })
}