# Mandarine CLI
The Mandarine CLI allows you to create Mandarine-powered application in seconds by the use of commands.

### Installing
In order to install Mandarine's CLI, you need to have installed Deno in your computer. Then, run from your terminal the following command:  
``` deno install -f --allow-read --allow-write --allow-run -n mandarine https://deno.land/x/mandarinets/cli.ts ```

# Usage
**Main Usage**  
```mandarine [OPTIONS] [SUBCOMMAND]```

**[OPTIONS]**  
* -h, --help
    * Shows the help information of Mandarine's CLI.
* -v, --version
    * Shows the version information of Mandarine's CLI
    
**[SUBCOMMAND]**
* `new`: Creates a Mandarine-powered application (following Mandarine's project structure) in the current working directory.
    * `mandarine new [OPTIONS]`
        * [OPTIONS]
            * `--directory (-d)` Indicates the directory where the mandarine-powered application will be created.
                * Required: No
            * `--force (-f)` Forces the overwriting of existing files in directory.
* `generate`: Generates a Mandarine-powered module.
    * `mandarine generate [MODULE NAME] [TYPES]`
        * [TYPES]
            * `--controller (-c)`: Adds a Controller component to the module.
            * `--service (-s)`: Adds a Service component to the module.
            * `--component`: Adds a regular mandarine-powered component to the module.
            * `--middleware (-m)`: Adds a middleware component to the module.
            * `--repository (-r)`: Adds a repository component to the module.
            * `--model`: Adds a mandarine-powered database model to the module.
            * `--configuration`: Adds a configuration component to the module
* `run`: Compiles & Run the mandarine application located in the current working directory.
    * `mandarine run [OPTIONS]`
        * [OPTIONS]
            * `--entry-point`: Defines where Mandarine's entry point file is located. Default: ${Deno.cwd()}/src/main/mandarine/app.ts
            * `--tsconfig`: Specifies the route of tsconfig.json to be used. Default: ${Deno.cwd()}/tsconfig.json
            * `--allow-write`: Specifies `deno` should use the flag --allow-write
            * `--allow-read`: Specifies `deno` should use the flag --allow-read
            * `--allow-run`: Specifies `deno` should use the flag --allow-run
            * `--reload`: Specifies `deno` should use the flag --reload
        
