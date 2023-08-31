import { Controller, Get, Route, Tags } from 'tsoa';
@Tags('Demo')
@Route('demo')
export class DemoController extends Controller {
  @Get('hello-world')
  public async helloWorld() {
    return 'Hello World!';
  }
}
