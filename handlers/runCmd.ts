import { CommandMetadata, objectGen } from "../types/types.ts";
import { CommandUtils } from "../utils/commandUtils.ts";
import { red } from "../deps.ts";


export const RunCmd = async (
  cmd: CommandMetadata,
  command: objectGen,
  options: objectGen
) => {
  CommandUtils.verifyRequiredOptions(cmd, options);
  CommandUtils.verifyValidityOptions(cmd, options);

  let appFile = `${Deno.cwd()}/src/main/mandarine/app.ts`;
  let tsConfig = `${Deno.cwd()}/tsconfig.json`;

  let entryPointOption = options["entry-point"];

  let tsConfigOption = options["tsconfig"];

  if (entryPointOption) {
    appFile = entryPointOption;
  }
  if (tsConfigOption) {
    tsConfig = tsConfigOption;
  }

  let denoRunOptions = {
    allowRead: false,
    allowWrite: false,
    allowRun: false,
    reload: false,
  };

  if (options["allow-read"]) {
    denoRunOptions.allowRead = options["allow-read"];
  } else {
    denoRunOptions.allowRead = true;
  }

  if (options["allow-write"]) {
    denoRunOptions.allowWrite = options["allow-write"];
  } else {
    denoRunOptions.allowWrite = true;
  }

  if (options["allow-run"]) {
    denoRunOptions.allowRun = true;
  }

  if (options["reload"]) {
    denoRunOptions.reload = true;
  }

  let denoCmd: string[] = ["deno", "run", "--config", tsConfig, "--allow-net"];

  if (denoRunOptions.allowRead) denoCmd.push("--allow-read");
  if (denoRunOptions.allowWrite) denoCmd.push("--allow-write");
  if (denoRunOptions.allowRun) denoCmd.push("--allow-run");
  if (denoRunOptions.reload) denoCmd.push("--reload");

  denoCmd.push(appFile);

  let appStatus = await Deno.run({
    cmd: denoCmd,
  }).status();

  if (!appStatus.success) {
    console.log(
      "Mandarine could not start the application. Make sure your working directory is the root of your application"
    );
    console.log(red("Exit"));
  } else {
    console.log(appStatus);
  }
};
