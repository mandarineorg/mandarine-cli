import { MandarineCore, Controller, GET } from "https://deno.land/x/mandarinets/mod.ts";
@Controller()
export class MyController {
  @GET('/')
  public httpHandler() {
      return "Hello world";
  }
}
