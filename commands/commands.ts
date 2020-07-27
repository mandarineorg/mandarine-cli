// Copyright 2020-2020 The Mandarine.TS Framework authors. All rights reserved. MIT license.

import { green, yellow } from "https://deno.land/std/fmt/colors.ts";
import { GenerateCmd } from "../handlers/generateCmd.ts";
import { CommandFactory } from "./commandFactory.ts";
import { CommandMetadata } from "../types/types.ts";
import { NewCmd } from "../handlers/newCmd.ts";
import { RunCmd } from "../handlers/runCmd.ts";
import { cliVersion } from "../version.ts";

export class Commands {
  private commands: CommandMetadata[] = [];

  constructor() {
    this.initializeNewCmd();
    this.initializeGenerateCmd();
    this.initializeRunCmd();
  }

  private initializeNewCmd() {
    this.commands.push(
      CommandFactory.new()
        .command("new")
        .alias("n")
        .description(
          "Creates a new mandarine-powered application following Mandarine's structure"
        )
        .usage("mandarine new [OPTIONS]")
        .handler(NewCmd)
        .option({
          flag: "directory",
          alias: "d",
          description:
            "Defines directory where application will be created. Default is current working directory",
          required: false,
        })
        .option({
          flag: "force",
          alias: "f",
          description: "When true, forces overwriting of existing files",
          required: false,
          defaultValue: false,
        })
        .get()
    );
  }

  private initializeGenerateCmd() {
    this.commands.push(
      CommandFactory.new()
        .command("generate")
        .alias("g")
        .description("Creates modules for a mandarine-powered application")
        .usage("mandarine generate [NAME] [TYPES]")
        .handler(GenerateCmd)
        .option({
          flag: "controller",
          alias: "c",
          description: "Creates a controller component for module",
          required: false,
        })
        .option({
          flag: "service",
          alias: "s",
          description: "Creates a service component for module",
          required: false,
        })
        .option({
          flag: "component",
          description: "Creates a regular component for module",
          required: false,
        })
        .option({
          flag: "middleware",
          alias: "m",
          description: "Creates a middleware component for module",
          required: false,
        })
        .option({
          flag: "repository",
          alias: "r",
          description: "Creates a repository component for module",
          required: false,
        })
        .option({
          flag: "model",
          description: "Creates a database model for module",
          required: false,
        })
        .option({
          flag: "configuration",
          description: "Creates a configuran component for module",
          required: false,
        })
        .get()
    );
  }

  private initializeRunCmd() {
    this.commands.push(
      CommandFactory.new()
        .command("run")
        .alias("r")
        .description(
          "Run the mandarine-powered application located in the current working directory"
        )
        .usage("mandarine run [OPTIONS]")
        .handler(RunCmd)
        .option({
          flag: "entry-point",
          description:
            "Defines the route of the mandarine-powered application. Default: ${Deno.cwd()}/src/main/mandarine/app.ts",
          required: false,
        })
        .option({
          flag: "tsconfig",
          description:
            "Specifies the route of tsconfig.json to be used. Default: ${Deno.cwd()}/tsconfig.json",
          required: false,
        })
        .option({
          flag: "allow-write",
          description: "Specifies `deno` should use the flag --allow-write",
          required: false,
        })
        .option({
          flag: "allow-read",
          description: "Specifies `deno` should use the flag --allow-read",
          required: false,
        })
        .option({
          flag: "allow-run",
          description: "Specifies `deno` should use the flag --allow-run",
          required: false,
        })
        .option({
          flag: "allow-env",
          description: "Specifies `deno` should use the flag --allow-env",
          required: false,
        })
        .option({
          flag: "allow-all",
          description: "Specifies `deno` should use the flag --allow-all",
          required: false,
        })
        .option({
          flag: "reload",
          description: "Specifies `deno` should use the flag --reload",
          required: false,
        })
        .get()
    );
  }

  public getHelp() {
    const helpInfo = [
      green(`Mandarine CLI ${yellow(cliVersion)}\n`),

      `\n${green(
        "Docs:"
      )} https://www.mandarinets.org/docs/mandarine/introduction\n`,
      `${green("Bugs:")} https://github.com/mandarineorg/mandarinets/issues\n`,

      green("\nUSAGE:\n"),
      "   mandarine [OPTIONS] [SUBCOMAND]\n",

      green("\nOPTIONS:\n"),
      "       -h, --help\n",
      "             Prints help information\n",

      "       -v, --version\n",
      "             Prints version information\n",

      green("\nSUBCOMMANDS:\n"),
    ].join("");

    console.log(helpInfo);

    for (const { alias, command, description } of this.commands) {
      console.log(`${yellow(command)} (${alias})    ${description}.`);
    }
    console.log("\n");
  }

  public getVersion() {
    console.log(`${green("Mandarine CLI Version:")} ${yellow(cliVersion)}`);
  }

  public getCommands(): CommandMetadata[] {
    return this.commands;
  }
}
