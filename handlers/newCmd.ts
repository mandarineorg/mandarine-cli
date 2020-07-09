import {
    structure as MandarineProjectStructure
} from "https://deno.land/x/mandarinets/mandarine-project-structure.ts";
import { CommandMetadata } from "../commands/types/types_command.ts";
import { green, bold } from "https://deno.land/std/fmt/colors.ts";
import { CommandUtils } from "../utils/commandUtils.ts";
import { CommonUtils } from "../utils/commonUtils.ts";

export const NewCmd = (
  cmd: CommandMetadata,
  command: object,
  options: object
) => {

  CommandUtils.verifyRequiredOptions(cmd, options);

  CommandUtils.verifyValidityOptions(cmd, options);
  let cwd = Deno.cwd();
  let force = false;

  //@ts-ignore
  if (options["directory"]) cwd = options["directory"];
  //@ts-ignore
  if (options["d"]) cwd = options["d"];

  //@ts-ignore
  if (options["force"] || options["f"]) force = true;

  MandarineProjectStructure.folders.forEach((folder) => {
    let fullPath = `${cwd}${folder}`;
    try {
      Deno.mkdirSync(fullPath);
    } catch (error) {
      // We skip if the folder already exists because we do not want to overwrite folders.
    }
  });

  const encoder = new TextEncoder();

  Object.keys(MandarineProjectStructure.files).forEach((fileKey) => {
    let filePath = fileKey;

    // @ts-ignore
    let fileContent = MandarineProjectStructure.files[fileKey];

    let writeableContent = encoder.encode(fileContent);

    let fullPath = `${cwd}${filePath}`;
    let fileExists = CommonUtils.fileDirExists(fullPath);
    if (fileExists && force) {
      Deno.removeSync(fullPath);
    } else if (fileExists && !force) {
      throw `File ${bold(filePath)} already exists. Use --force to overwrite.`;
    }

    Deno.writeFileSync(fullPath, writeableContent);
  });

  console.log(`Mandarine-powered project created ${green("successfully")}`);
};
