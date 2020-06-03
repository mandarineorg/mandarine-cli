import { CommandMetadata } from "../commands/commandMetadata.ts";
import { CommandUtils } from "../utils/commandUtils.ts";
import { structure as MandarineProjectStructure } from "https://deno.land/x/mandarinets/mandarine-project-structure.ts";

export const NewCmd = (cmd: CommandMetadata, command: object, options: object) => {
    // @ts-ignore
    CommandUtils.verifyRequiredOptions(cmd.options, options);
    let cwd = Deno.cwd();

    //@ts-ignore
    if(options["directory"]) cwd = options["directory"];
    //@ts-ignore
    if(options["d"]) cwd = options["d"];

    MandarineProjectStructure.folders.forEach((folder) => {
        Deno.mkdirSync(`${cwd}${folder}`);
    });

    const encoder = new TextEncoder();

    Object.keys(MandarineProjectStructure.files).forEach((fileKey) => {
        let filePath = fileKey;

        // @ts-ignore
        let fileContent = MandarineProjectStructure.files[fileKey];

        let writeableContent = encoder.encode(fileContent);

        Deno.writeFileSync(`${cwd}${filePath}`, writeableContent);
    });
}