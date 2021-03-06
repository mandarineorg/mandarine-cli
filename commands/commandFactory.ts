// Copyright 2020-2020 The Mandarine.TS Framework authors. All rights reserved. MIT license.

import { CommandMetadata, OptionsMetadata } from "../types/types.ts";

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

  public usage(usage: string): CommandFactory {
    this.optionMetadata.usage = usage;
    return this;
  }

  public option(optionMetadata: OptionsMetadata): CommandFactory {
    if (!this.optionMetadata.options) {
      this.optionMetadata.options = [];
    }

    this.optionMetadata.options?.push(optionMetadata);
    return this;
  }

  public get() {
    return this.optionMetadata;
  }
}
