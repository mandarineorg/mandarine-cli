// Copyright 2020-2020 The Mandarine.TS Framework authors. All rights reserved. MIT license.

export class CommonUtils {
  public static fileDirExists(path: string): boolean {
    try {
      Deno.statSync(path);
      return true;
    } catch (error) {
      return false;
    }
  }
}
