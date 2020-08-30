// Copyright 2020-2020 The Mandarine.TS Framework authors. All rights reserved. MIT license.

import { CommandMetadata, objectGen } from "../types/types.ts";
import { CommandUtils } from "../utils/commandUtils.ts";
import { MandarineProjectStructure } from "../deps.ts";
import { CommonUtils } from "../utils/commonUtils.ts";
import { colors } from "../imports/fmt.ts";

const { green, bold } = colors;

export const NewCmd = (
  cmd: CommandMetadata,
  command: objectGen,
  options: objectGen
) => {
  CommandUtils.verifyRequiredOptions(cmd, options);

  CommandUtils.verifyValidityOptions(cmd, options);
  let cwd = Deno.cwd();
  let force = false;

  if (options["directory"]) cwd = options["directory"];

  if (options["d"]) cwd = options["d"];

  if (options["force"] || options["f"]) force = true;

  MandarineProjectStructure.folders.forEach((folder) => {
    let fullPath = `${cwd}${folder}`;
    try {
      Deno.mkdirSync(fullPath);
    } catch (error) {
      // * We skip if the folder already exists because we do not want to overwrite folders.
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
