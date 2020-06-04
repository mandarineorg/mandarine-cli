export const controllerFile = `import { Controller } from "https://deno.land/x/mandarinets/mod.ts";

@Controller()
export class %controllerName% {
}
`;

export const serviceFile = `import { Service } from "https://deno.land/x/mandarinets/mod.ts";

@Service()
export class %serviceName% {
}
`;

export const componentFile = `import { Component } from "https://deno.land/x/mandarinets/mod.ts";

@Component()
export class %componentName% {
}
`;

export const middlewareFile = `import { Middleware, MiddlewareTarget } from "https://deno.land/x/mandarinets/mod.ts";

@Middleware(new RegExp('/'))
export class %middlewareName% implements MiddlewareTarget {

    public onPreRequest(@ResponseParam() response: any): boolean {
        /**
         * True = the request must continue, 
         * False = the request will stop 
         */
        return true;
    }
    
    public onPostRequest(): void {
    }

}
`;

export const repositoryFile = `import { Repository, MandarineRepository } from "https://deno.land/x/mandarinets/mod.ts";

@Repository()
export abstract class %repositoryName% extends MandarineRepository<YourModel> {

    constructor() {
        super(YourModel);
    }
    
}
`;

export const configurationFile = `import { Configuration } from "https://deno.land/x/mandarinets/mod.ts";

@Configuration()
export class %configurationName% {
}
`;

export const modelFile = `import { Table, Id, GeneratedValue, Column } from "https://deno.land/x/mandarinets/mod.ts";

@Table({ schema: "public", name: "%modelTableName%" })
export class %modelName% {

    @Id()
    @GeneratedValue({strategy: "SEQUENCE"})
    @Column()
    public id: number;
}`;