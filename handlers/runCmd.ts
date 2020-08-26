// Copyright 2020-2020 The Mandarine.TS Framework authors. All rights reserved. MIT license.

import { CommandMetadata, objectGen } from "../types/types.ts";
import { CommandUtils } from "../utils/commandUtils.ts";
import { colors } from "../imports/fmt.ts";

const { red } = colors;

export const RunCmd = async (
  cmd: CommandMetadata,
  command: objectGen,
  options: objectGen
) => {
  CommandUtils.verifyRequiredOptions(cmd, options);
  CommandUtils.verifyValidityOptions(cmd, options);

  let appFile = `${Deno.cwd()}/src/mandarine/app.ts`;
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
    allowEnv: false,
    allowAll: false,
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

  if (options["allow-env"]) {
    denoRunOptions.allowEnv = true;
  }

  if (options["allow-all"]) {
    denoRunOptions.allowAll = true;
  }

  let denoCmd: string[] = [
    "deno",
    "run",
    "--config",
    tsConfig,
    "--allow-net",
    "--allow-env",
  ];

  if (denoRunOptions.allowRead) denoCmd.push("--allow-read");
  if (denoRunOptions.allowWrite) denoCmd.push("--allow-write");
  if (denoRunOptions.allowRun) denoCmd.push("--allow-run");
  if (denoRunOptions.reload) denoCmd.push("--reload");
  if (denoRunOptions.allowAll) denoCmd.push("--allow-all");
  if (denoRunOptions.allowEnv) denoCmd.push("--allow-env");

  denoCmd.push(appFile);

  // * reload project when files changes
  const runApp = (): Deno.Process => {
    return Deno.run({
      cmd: denoCmd,
    });
  };

  let task = runApp();

  let throttle = 200;

  let timeout: number | null = null;

  for await (const event of Deno.watchFs(".")) {
    if (event.kind !== "access") {
      if (timeout) clearTimeout(timeout);

      timeout = setTimeout(() => {
        task && task.close();
        console.clear();
        task = runApp();
      }, throttle);
    }
  }

  if (!(await task.status()).success) {
    console.log(
      "Mandarine could not start the application. Make sure your working directory is the root of your application"
    );
    console.log(red("Exit"));
  } else {
    console.log(task);
  }
};
