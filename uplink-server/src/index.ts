import { ExpressHttp } from './infrastructure/http/express';

async function main() {
  const http = new ExpressHttp();
  await http.listen();
}

main();
