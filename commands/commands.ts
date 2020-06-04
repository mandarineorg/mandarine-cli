import { CommandMetadata } from "./commandMetadata.ts";
import { CommandFactory } from "./commandFactory.ts";
import { NewCmd } from "../handlers/newCmd.ts";
import { GenerateCmd } from "../handlers/generateCmd.ts";
import { cliVersion } from "../version.ts";
import { RunCmd } from "../handlers/runCmd.ts";

export class Commands {

    private commands: Array<CommandMetadata> = new Array<CommandMetadata>();

    constructor() {
        this.initializeNewCmd();
        this.initializeGenerateCmd();
        this.initializeRunCmd();
    }

    private initializeNewCmd() {
        this.commands.push(
            CommandFactory
            .new()
            .command("new")
            .alias("n")
            .description("Creates a new mandarine-powered application following Mandarine's structure")
            .usage("mandarine new [OPTIONS]")
            .handler(NewCmd)
            .option({
                flag: "directory",
                alias: "d",
                description: "Defines directory where application will be created. Default is current working directory",
                required: false
            })
            .option({
                flag: "force",
                alias: "f",
                description: "When true, forces overwriting of existing files",
                required: false,
                defaultValue: false
            })
            .get()
        );
    }

    private initializeGenerateCmd() {
        this.commands.push(
            CommandFactory
            .new()
            .command("generate")
            .alias("g")
            .description("Creates modules for a mandarine-powered application")
            .usage("mandarine generate [NAME] [TYPES]")
            .handler(GenerateCmd)
            .option({
                flag: "controller",
                alias: "c",
                description: "Creates a controller component for module",
                required: false
            })
            .option({
                flag: "service",
                alias: "s",
                description: "Creates a service component for module",
                required: false
            })
            .option({
                flag: "component",
                description: "Creates a regular component for module",
                required: false
            })
            .option({
                flag: "middleware",
                alias: "m",
                description: "Creates a middleware component for module",
                required: false
            })
            .option({
                flag: "repository",
                alias: "r",
                description: "Creates a repository component for module",
                required: false
            })
            .option({
                flag: "model",
                description: "Creates a database model for module",
                required: false
            })
            .option({
                flag: "configuration",
                description: "Creates a configuran component for module",
                required: false
            })
            .get()
        );
    }

    private initializeRunCmd() {
        this.commands.push(
            CommandFactory
            .new()
            .command("run")
            .alias("r")
            .description("Run the mandarine-powered application located in the current working directory")
            .usage("mandarine run [OPTIONS]")
            .handler(RunCmd)
            .option({
                flag: "entry-point",
                description: "Defines the route of the mandarine-powered application. Default: ${Deno.cwd()}/src/main/mandarine/app.ts",
                required: false
            })
            .option({
                flag: "tsconfig",
                description: "Specifies the route of tsconfig.json to be used",
                required: false
            })
            .option({
                flag: "allow-write",
                description: "Specifies `deno` should use the flag --allow-write",
                required: false
            })
            .option({
                flag: "allow-read",
                description: "Specifies `deno` should use the flag --allow-read",
                required: false
            })
            .option({
                flag: "allow-run",
                description: "Specifies `deno` should use the flag --allow-run",
                required: false
            })
            .option({
                flag: "reload",
                description: "Specifies `deno` should use the flag --reload",
                required: false
            })
            .get()
        );
    }

    public getHelp() {
        console.log(`Mandarine CLI ${cliVersion}`);
        console.log("");
        console.log("Docs: https://mandarineframework.gitbook.io/mandarine-ts/");
        console.log("Bugs: https://github.com/mandarineorg/mandarinets/issues");
        console.log("");
        console.log(`USAGE:
                    mandarine [OPTIONS] [SUBCOMAND]`);
        console.log("");
        console.log(`OPTIONS:
                    -h, --help
                            Prints help information
                    -v, --version
                            Prints version information`);
        console.log("");
        console.log("SUBCOMMANDS:")
        for(let i = 0; i<this.commands.length; i++) {
            let cmd = this.commands[i];
            console.log(`${cmd.command} (${cmd.alias})             ${cmd.description}`);
        }
        console.log("");
    }

    public getVersion() {
        console.log(`Mandarine CLI Version: ${cliVersion}`);
    }

    public getCommands(): Array<CommandMetadata> {
        return this.commands;
    }
}