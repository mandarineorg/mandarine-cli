// @ts-nocheck
import { CommandMetadata } from "../commands/commandMetadata.ts";
import { CommandUtils } from "../utils/commandUtils.ts";
import { controllerFile, serviceFile, componentFile, middlewareFile, repositoryFile, modelFile, configurationFile } from "../defaults/defaultFiles.ts";
import { CommonUtils } from "../utils/commonUtils.ts";
import { bold, green } from "https://deno.land/std/fmt/colors.ts";
const typeErrorMsg = `
Please specify a type to generate:

--controller
--service
--component
--middleware
--repository
--model
--configuration

mdrn --generate [NAME] [TYPES]`;

const badSyntax = `
Bad generation syntax:

mdrn --generate [NAME] [TYPES]`;

export const GenerateCmd = (cmd: CommandMetadata, command: object, options: object) => {

    CommandUtils.verifyRequiredOptions(cmd.options, options);
    CommandUtils.verifyValidityOptions(cmd.options, options);

    let moduleName = undefined;
    
    if(command[cmd.alias] != undefined) {
        moduleName = command[cmd.alias];
    } else if(command[cmd.command] != undefined) {
        moduleName = command[cmd.command];
    }
    
    if(!(moduleName instanceof String) || moduleName == undefined) throw badSyntax;

    let optionKeys = Object.keys(options);
    if(options == undefined || optionKeys.length == 0) throw typeErrorMsg;

    let moduleFolder = `/src/main/mandarine/${moduleName}`;
    let toGenerate: object = {
        folders: [moduleFolder],
        files: {
        }
    };

    let componentName;
    optionKeys.forEach((componentKey) => {
        let componentType = componentKey;
        switch(componentType) {
            case "controller":
            case "c":
                componentName = `${moduleName}Controller`;
                toGenerate.files[`${moduleName}.controller.ts`] = controllerFile.replace("%controllerName%", componentName);
                break;
            case "service":
            case "s":
                componentName = `${moduleName}Service`;
                toGenerate.files[`${moduleName}.service.ts`] = serviceFile.replace("%serviceName%", componentName);
                break;
            case "component":
                componentName = `${moduleName}Component`;
                toGenerate.files[`${moduleName}.component.ts`] = componentFile.replace("%componentName%", componentName);
                break;
            case "middleware":
            case "m":
                componentName = `${moduleName}Middleware`;
                toGenerate.files[`${moduleName}.middleware.ts`] = middlewareFile.replace("%middlewareName%", componentName);
                break;
            case "repository":
            case "r":
                componentName = `${moduleName}Repository`;
                toGenerate.files[`${moduleName}.repository.ts`] = repositoryFile.replace("%repositoryName%", componentName);
                break;
            case "model":
                componentName = `${moduleName}Model`;
                toGenerate.files[`${moduleName}.model.ts`] = modelFile.replace("%modelName%", componentName).replace("%modelTableName%", moduleName);
                break;
            case "configuration":
                componentName = `${moduleName}Configuration`;
                toGenerate.files[`${moduleName}.configuration.ts`] = configurationFile.replace("%configurationName%", componentName);
                break;
        }
    });

    toGenerate.folders.forEach((folder) => {
        if(CommonUtils.fileDirExists(`${Deno.cwd()}${folder}`)) return;

        Deno.mkdirSync(`${Deno.cwd()}${folder}`);
    });

    const encoder = new TextEncoder();
    Object.keys(toGenerate.files).forEach((file) => {
        let filePath = `${Deno.cwd()}${moduleFolder}/${file}`;

        if(CommonUtils.fileDirExists(filePath)) { 
            console.log(`${bold(file)} exists in Module, skipping.`);
            return;
        };

        let writeableContent = encoder.encode(toGenerate.files[file]);
        Deno.writeFileSync(filePath, writeableContent);
    });
    
    console.log(`Module created ${green('successfully')}`);
}