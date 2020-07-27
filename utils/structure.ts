// Copyright 2020-2020 The Mandarine.TS Framework authors. All rights reserved. MIT license.

const enum Structure {
  DefaultConfig = `{
    "mandarine": {
      "server": {
        "host": "127.0.0.1",
        "port": 8080,
        "responseType": "text/html"
      },
      "resources": {
        "staticFolder": "/src/resources/static",
        "staticRegExpPattern": "/(.*)"
      },
      "templateEngine": {
        "path": "./src/resources/templates",
        "engine": "ejs"
      }
    }
  }`,

  DefaultHelloWorldEndpoint = `import { MandarineCore, Controller, GET } from "https://deno.land/x/mandarinets/mod.ts";
@Controller()
export class MyController {
  @GET('/')
  public httpHandler() {
      return "Hello world";
  }
}
`,
  DefaultAppFile = `import { MandarineCore } from "https://deno.land/x/mandarinets/mod.ts";
import { MyController } from "./hello_world/helloWorld.ts";
const controllers = [MyController];
const services = [];
const middleware = [];
const repositories = [];
const configurations = [];
const components = [];
const otherModules = [];
new MandarineCore().MVC().run();
`,
  DefaultTsConfig = `{
    "compilerOptions": {
      "strict": false,
      "noImplicitAny": false,
      "noImplicitThis": false,
      "alwaysStrict": false,
      "strictNullChecks": false,
      "strictFunctionTypes": true,
      "strictPropertyInitialization": false,
      "experimentalDecorators": true,
      "emitDecoratorMetadata": true
    }
  }`,
}

export const structure = {
  folders: [
    "/test",
    "/src",
    "/src/mandarine",
    "/src/mandarine/hello_world",
    "/src/resources",
    "/src/resources/templates",
    "/src/resources/static",
  ],
  files: {
    "/src/resources/properties.json": Structure.DefaultConfig,
    "/src/mandarine/app.ts": Structure.DefaultAppFile,
    "/src/mandarine/hello_world/helloWorld.ts":
      Structure.DefaultHelloWorldEndpoint,
    "/tsconfig.json": Structure.DefaultTsConfig,
  },
};
