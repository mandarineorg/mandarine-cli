// Copyright 2020-2020 The Mandarine.TS Framework authors. All rights reserved. MIT license.

import { CommandMetadata } from "../types/types.ts";
import { bold } from "../deps.ts";

export class CommandUtils {
  public static verifyRequiredOptions(
    cmd: CommandMetadata,
    contextOptions: object
  ) {
    cmd.options?.forEach((option) => {
      if (option.required == undefined) option.required = false;

      let byFlag = option.flag in contextOptions;

      let byAlias = (option.alias as string) in contextOptions;

      if (option.required && !byFlag && !byAlias) {
        throw `Option --${option.flag} (-${option.alias}) is required

                ${cmd.usage}`;
      }
    });
  }

  public static verifyValidityOptions(
    cmd: CommandMetadata,
    contextOptions: object
  ) {
    Object.keys(contextOptions).forEach((cmdOptionKey) => {
      if (
        !cmd.options?.some(
          (option) =>
            option.alias == cmdOptionKey || option.flag == cmdOptionKey
        )
      ) {
        throw `Found argument ${bold(
          cmdOptionKey
        )} which wasn't expected, or isn't valid in this context

                ${cmd.usage}`;
      }
    });
  }
}
