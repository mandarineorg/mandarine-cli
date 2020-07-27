// Copyright 2020-2020 The Mandarine.TS Framework authors. All rights reserved. MIT license.

export const enum defaultFiles {
  controller = `import { Controller } from "https://deno.land/x/mandarinets/mod.ts";

    @Controller()
    export class %controllerName% {
    }
    `,

  service = `import { Service } from "https://deno.land/x/mandarinets/mod.ts";

    @Service()
    export class %serviceName% {
    }
    `,

  component = `import { Component } from "https://deno.land/x/mandarinets/mod.ts";

    @Component()
    export class %componentName% {
    }
    `,

  middleware = `import { Middleware, MiddlewareTarget, ResponseParam, RequestParam } from "https://deno.land/x/mandarinets/mod.ts";

    @Middleware(new RegExp('/'))
    export class %middlewareName% implements MiddlewareTarget {

        public onPreRequest(@RequestParam() request: any, @ResponseParam() response: any): boolean {
            /**
             * True = the request must continue,
             * False = the request will stop
             */
            return true;
        }

        public onPostRequest(): void {
        }

    }
    `,

  repository = `import { Repository, MandarineRepository } from "https://deno.land/x/mandarinets/mod.ts";

    @Repository()
    export abstract class %repositoryName% extends MandarineRepository<YourModel> {

        constructor() {
            super(YourModel);
        }

    }
    `,

  configuration = `import { Configuration } from "https://deno.land/x/mandarinets/mod.ts";

    @Configuration()
    export class %configurationName% {
    }
`,

  model = `import { Table, Id, GeneratedValue, Column } from "https://deno.land/x/mandarinets/mod.ts";

    @Table({ schema: "public", name: "%modelTableName%" })
    export class %modelName% {

    @Id()
    @GeneratedValue({strategy: "SEQUENCE"})
    @Column()
    public id: number;
}`,
}
