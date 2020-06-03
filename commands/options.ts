import { CommandMetadata } from "./commandMetadata.ts";
import { CommandFactory } from "./commandFactory.ts";
import { NewCmd } from "../handlers/newCmd.ts";

export class Commands {

    private commands: Array<CommandMetadata> = new Array<CommandMetadata>();

    constructor() {
        this.initializeNewCmd();
        this.initializeGenerateCmd();
    }

    private initializeNewCmd() {
        this.commands.push(
            CommandFactory
            .new()
            .command("new")
            .alias("n")
            .description("Creates a new mandarine-powered application following Mandarine's structure")
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
                alias: "com",
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
                alias: "dbm",
                description: "Creates a database model for module",
                required: false
            })
            .get()
        );
    }

    public getCommands(): Array<CommandMetadata> {
        return this.commands;
    }
}