import { CommandMetadata } from "../commands/commandMetadata.ts";
import { CommandUtils } from "../utils/commandUtils.ts";
import { red } from "https://deno.land/std/fmt/colors.ts";
export const RunCmd = async (cmd: CommandMetadata, command: object, options: object) => {

    CommandUtils.verifyRequiredOptions(cmd, options);
    CommandUtils.verifyValidityOptions(cmd, options);

    let appFile = `${Deno.cwd()}/src/main/mandarine/app.ts`;
    let tsConfig = `${Deno.cwd()}/tsconfig.json`;

    // @ts-ignore
    let entryPointOption = options['entry-point'];

    // @ts-ignore
    let tsConfigOption = options['tsconfig'];

    if(entryPointOption) {
        appFile = entryPointOption;
    }
    if(tsConfigOption) {
        tsConfig = tsConfigOption;
    }

    let denoRunOptions = {
        allowRead: false,
        allowWrite: false,
        allowRun: false,
        reload: false
    };

    // @ts-ignore
    if(options['allow-read']) { denoRunOptions.allowRead = options['allow-read']; } else { denoRunOptions.allowRead = true; };
    //@ts-ignore
    if(options['allow-write']) { denoRunOptions.allowWrite = options['allow-write']; } else { denoRunOptions.allowWrite = true; };
    //@ts-ignore
    if(options['allow-run']) { denoRunOptions.allowRun = true; }
    //@ts-ignore
    if(options['reload']) { denoRunOptions.reload = true; }

    let denoCmd: Array<string> = new Array<string>();
    denoCmd.push("deno");
    denoCmd.push("run");
    denoCmd.push("--config");
    denoCmd.push(tsConfig);
    denoCmd.push("--allow-net");
    
    if(denoRunOptions.allowRead) denoCmd.push("--allow-read");
    if(denoRunOptions.allowWrite) denoCmd.push("--allow-write");
    if(denoRunOptions.allowRun) denoCmd.push("--allow-run");
    if(denoRunOptions.reload) denoCmd.push("--reload");

    denoCmd.push(appFile);

    let appStatus = await Deno.run({
        cmd: denoCmd
    }).status();

    if(!appStatus.success) {
        console.log("Mandarine could not start the application. Make sure your working directory is the root of your application");
        console.log(red("Exit"));
    } else {
        console.log(appStatus);
    }


}