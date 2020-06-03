import { CommandMetadata } from "./commandMetadata.ts";
import { OptionsMetadata } from "./options/optionsMetadata.ts";

export class CommandFactory {

    // @ts-ignore
    private optionMetadata: CommandMetadata = {};

    public static new() {
        return new CommandFactory();
    }

    public command(command: string): CommandFactory {
        this.optionMetadata.command = command;
        return this;
    }

    public alias(alias: string): CommandFactory {
        this.optionMetadata.alias = alias;
        return this;
    }

    public description(description: string): CommandFactory {
        this.optionMetadata.description = description;
        return this;
    }

    public handler(handler: Function): CommandFactory {
        this.optionMetadata.handler = handler;
        return this;
    }

    public option(optionMetadata: OptionsMetadata): CommandFactory {
        // @ts-ignore
        if(this.optionMetadata.options == (null || undefined)) this.optionMetadata.options = new Array<any>();

        this.optionMetadata.options?.push(optionMetadata);
        return this;
    }

    public get() {
        return this.optionMetadata;
    }
}