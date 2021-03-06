// Copyright 2020-2020 The Mandarine.TS Framework authors. All rights reserved. MIT license.

import { Commands } from "./commands/commands.ts";
import { objectGen } from "./types/types.ts";
import { parse } from "./imports/flags.ts";
import { colors } from "./imports/fmt.ts";

const { bold } = colors;

export async function Process(): Promise<void> {
  const { args } = Deno;
  const data = parse(args);
  const commands = new Commands();

  const existingCommands = commands.getCommands();

  let currentCommandName = data["_"][0];

  let command = {
    [currentCommandName]: data["_"][1],
  };

  let options: objectGen = Object.assign({}, data);

  delete options["_"];

  let optionKeys = Object.keys(options);
  if (
    optionKeys[0] === "h" ||
    optionKeys[0] === "help" ||
    (optionKeys.length === 0 && currentCommandName === undefined)
  ) {
    commands.getHelp();
    return;
  } else if (optionKeys[0] === "v" || optionKeys[0] === "version") {
    commands.getVersion();
    return;
  }

  let found = false;
  for (let i = 0; i < existingCommands.length; i++) {
    let cmd = existingCommands[i];
    if (cmd.alias == currentCommandName || cmd.command == currentCommandName) {
      found = true;
      cmd.handler(cmd, command, options);
      break;
    }
  }

  if (!found) {
    console.log(`Found argument ${bold(
      (currentCommandName != undefined
        ? currentCommandName
        : optionKeys[0]) as string
    )} which wasn't expected, or isn't valid in this context
        USAGE:
        mandarine [OPTIONS] [SUBCOMMAND]
        `);
  }
}

if (import.meta.main) {
  await Process();
}
