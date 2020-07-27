// Copyright 2020-2020 The Mandarine.TS Framework authors. All rights reserved. MIT license.

import { defaultFiles } from "../defaults/defaultFiles.ts";
import { bold, green } from "../deps.ts";
import { CommandMetadata, objectGen } from "../types/types.ts";
import { CommandUtils } from "../utils/commandUtils.ts";
import { CommonUtils } from "../utils/commonUtils.ts";

const typeErrorMsg = `
Please specify a type to generate:

--controller
--service
--component
--middleware
--repository
--model
--configuration`;

export const GenerateCmd = (
  cmd: CommandMetadata,
  command: objectGen,
  options: objectGen
) => {
  CommandUtils.verifyRequiredOptions(cmd, options);
  CommandUtils.verifyValidityOptions(cmd, options);

  let moduleName: any;

  if (command[cmd.alias] != undefined) {
    moduleName = command[cmd.alias];
  } else if (command[cmd.command] != undefined) {
    moduleName = command[cmd.command];
  }

  if (!(typeof moduleName === "string") || moduleName == undefined) {
    console.log(`
        Bad syntax:

        ${cmd.usage}
        `);
    return;
  }

  let optionKeys = Object.keys(options);
  if (options == undefined || optionKeys.length == 0) {
    console.log(typeErrorMsg);
    console.log("");
    console.log(cmd.usage);
    console.log("");
    return;
  }

  let moduleFolder = `/src/mandarine/${moduleName}`;
  let toGenerate: { folders: string[]; files: objectGen } = {
    folders: [moduleFolder],
    files: {},
  };

  let componentName;
  optionKeys.forEach((componentKey) => {
    let componentType = componentKey;
    switch (componentType) {
      case "controller":

      case "c":
        componentName = `${moduleName}Controller`;
        toGenerate.files[
          `${moduleName}.controller.ts`
        ] = defaultFiles.controller.replace("%controllerName%", componentName);
        break;

      case "service":

      case "s":
        componentName = `${moduleName}Service`;
        toGenerate.files[
          `${moduleName}.service.ts`
        ] = defaultFiles.service.replace("%serviceName%", componentName);
        break;

      case "component":
        componentName = `${moduleName}Component`;
        toGenerate.files[
          `${moduleName}.component.ts`
        ] = defaultFiles.component.replace("%componentName%", componentName);
        break;
      case "middleware":

      case "m":
        componentName = `${moduleName}Middleware`;
        toGenerate.files[
          `${moduleName}.middleware.ts`
        ] = defaultFiles.middleware.replace("%middlewareName%", componentName);
        break;
      case "repository":

      case "r":
        componentName = `${moduleName}Repository`;
        toGenerate.files[
          `${moduleName}.repository.ts`
        ] = defaultFiles.repository.replace("%repositoryName%", componentName);
        break;

      case "model":
        componentName = `${moduleName}Model`;
        toGenerate.files[`${moduleName}.model.ts`] = defaultFiles.model
          .replace("%modelName%", componentName)
          .replace("%modelTableName%", moduleName);
        break;

      case "configuration":
        componentName = `${moduleName}Configuration`;
        toGenerate.files[
          `${moduleName}.configuration.ts`
        ] = defaultFiles.configuration.replace(
          "%configurationName%",
          componentName
        );
        break;
    }
  });

  toGenerate.folders.forEach((folder) => {
    if (CommonUtils.fileDirExists(`${Deno.cwd()}${folder}`)) return;

    Deno.mkdirSync(`${Deno.cwd()}${folder}`);
  });

  const encoder = new TextEncoder();
  Object.keys(toGenerate.files).forEach((file) => {
    let filePath = `${Deno.cwd()}${moduleFolder}/${file}`;

    if (CommonUtils.fileDirExists(filePath)) {
      console.log(`${bold(file)} exists in Module, skipping.`);
      return;
    }

    let writeableContent = encoder.encode(toGenerate.files[file]);
    Deno.writeFileSync(filePath, writeableContent);
  });

  console.log(`Module created ${green("successfully")}`);
};
